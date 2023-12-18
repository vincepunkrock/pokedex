import { Component, EventEmitter, Output, effect, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { selectPokemon } from '../actions/pokemon.actions';
import { AbilityDetails } from '../models/abilityDetails.model';
import { EvolutionChainDetails } from '../models/evolutionChainDetails';
import { Ability } from '../models/pokemonDetails.model';
import { Pokemon } from '../models/speciesDetails.model';
import { getSelectedPokemon } from '../selectors/pokemon.selectors';
import { PokeapiService } from '../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent {

  pokemon = this.store.selectSignal(getSelectedPokemon);
  
  abilities = signal<AbilityDetails[]>([]);
  evolutions = signal<Pokemon[]>([]);
  displayedColumns = ['name', 'effect_entries'];

  loading: boolean = false;
  showFront: boolean = true;

  @Output() selected: EventEmitter<Pokemon> = new EventEmitter();

  constructor(
    private pokeapiService: PokeapiService,
    private store: Store
  ) {
    effect(() => {
      if(this.pokemon().details?.abilities.length) {
        this.loadAbilities(this.pokemon().details?.abilities || []);
        this.loadEvolutionFromSpeciesUrl(this.pokemon().details?.species.url || "");
      }
    });
  }

  loadAbilities(abilities: Ability[]) {

    this.loading = true;
    forkJoin(
      abilities.map(a => this.pokeapiService.getAbilityFromUrl(a.ability.url))
    ).subscribe(res => {
      this.abilities.set(res);
      this.loading = false;
    });

  }

  loadEvolutionFromSpeciesUrl(url: string) {

    this.pokeapiService.getSpeciesFromUrl(url).subscribe(speciesDetails => {
      this.pokeapiService.getEvolutionChainFromUrl(speciesDetails.evolution_chain.url).subscribe(evolutionChain => {
        const evolutions = this.getEvolutions(evolutionChain);
        forkJoin(
          evolutions.map(e => this.pokeapiService.getSpeciesFromUrl(e.url))
        ).subscribe(evolutionSpecies => {
          this.evolutions.set(evolutionSpecies.map(es => es.varieties[0].pokemon));
        });
      });
    });
  }

  getEvolutions(evolutionChain: EvolutionChainDetails): Pokemon[] {
    const evolutions: Pokemon[] = [evolutionChain.chain.species];
    let nextEvolution = evolutionChain.chain.evolves_to[0];
    while(nextEvolution) {
      evolutions.push(nextEvolution.species);
      nextEvolution = nextEvolution.evolves_to[0];
    }
    return evolutions;
  }

  rotate() {
    this.showFront = !this.showFront;
  }

  select(pokemon: Pokemon) {
    this.selected.emit(pokemon);
  }

  close() {
    this.store.dispatch(selectPokemon({ pokemon: {name: "",
    url: "",
    details: undefined} }));
  }

}
