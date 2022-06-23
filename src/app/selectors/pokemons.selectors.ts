import { createFeatureSelector } from '@ngrx/store';
import { Pokemon } from '../models/pokemon.model';
 
export const selectPokemons = createFeatureSelector<ReadonlyArray<Pokemon>>('pokemons');