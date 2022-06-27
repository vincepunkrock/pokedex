import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, of } from 'rxjs';
import { AbilityDetails } from '../models/abilityDetails.model';
import { Ability } from '../models/pokemonDetails.model';
import { selectedPokemon } from '../selectors/pokedex.selectors';
import { PokeapiService } from '../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon$ = this.store.select(selectedPokemon);
  
  abilities: AbilityDetails[] = [];
  displayedColumns = ['name', 'effect_entries'];

  loading: boolean = false;

  constructor(
    private pokeapiService: PokeapiService,
    private store: Store
  ) { }

  ngOnInit(): void {

    this.pokemon$.subscribe((pokemon) => {
      if(pokemon.details?.abilities.length) {
        this.loadAbilities(pokemon.details?.abilities);
      }
    });

  }

  loadAbilities(abilities: Ability[]) {

    this.loading = true;
    forkJoin(
      abilities.map(a => this.pokeapiService.getAbilityFromUrl(a.ability.url))
    ).subscribe(res => {
      console.log("Abilities", res);
      this.abilities = res;
      this.loading = false;
    });

  }

}
