import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../models/pokemon.model';

export const selectPokemon = createAction('[Pokedex] Select Pokemon', props<{pokemon: Pokemon}>());