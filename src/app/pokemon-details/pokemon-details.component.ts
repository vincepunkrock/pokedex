import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { selectPokemon } from '../actions/pokemon.actions';
import { AbilityDetails } from '../models/abilityDetails.model';
import { EvolutionChainDetails } from '../models/evolutionChainDetails';
import { Ability } from '../models/pokemonDetails.model';
import { Pokemon } from '../models/speciesDetails.model';
import { selectedPokemon } from '../selectors/pokemon.selectors';
import { PokeapiService } from '../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon$ = this.store.select(selectedPokemon);
  
  abilities: AbilityDetails[] = [];
  evolutions: Pokemon[] = [];
  displayedColumns = ['name', 'effect_entries'];

  loading: boolean = false;
  showFront: boolean = true;

  @Output() selected: EventEmitter<Pokemon> = new EventEmitter();

  constructor(
    private pokeapiService: PokeapiService,
    private store: Store
  ) { }

  ngOnInit(): void {

    this.pokemon$.subscribe((pokemon) => {
      if(pokemon.details?.abilities.length) {
        this.loadAbilities(pokemon.details?.abilities);
        this.loadEvolutionFromSpeciesUrl(pokemon.details?.species.url);
      }
    });

  }

  loadAbilities(abilities: Ability[]) {

    this.loading = true;
    this.abilities = [];
    forkJoin(
      abilities.map(a => this.pokeapiService.getAbilityFromUrl(a.ability.url))
    ).subscribe(res => {
      this.abilities = res;
      this.loading = false;
    });

  }

  loadEvolutionFromSpeciesUrl(url: string) {

    this.evolutions = [];
    this.pokeapiService.getSpeciesFromUrl(url).subscribe(speciesDetails => {
      this.pokeapiService.getEvolutionChainFromUrl(speciesDetails.evolution_chain.url).subscribe(evolutionChain => {
        const evolutions = this.getEvolutions(evolutionChain);
        forkJoin(
          evolutions.map(e => this.pokeapiService.getSpeciesFromUrl(e.url))
        ).subscribe(evolutionSpecies => {
          this.evolutions = evolutionSpecies.map(es => es.varieties[0].pokemon);
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

  turnAround() {
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
