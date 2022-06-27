import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../models/pokemon.model';

export const retrievedPokemonList = createAction(
    '[Pokemon List/API] Retrieve Pokemons Success',
    props<{ pokemons: Pokemon[] }>()
);