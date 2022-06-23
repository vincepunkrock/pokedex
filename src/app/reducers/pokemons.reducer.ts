import { createReducer, on } from '@ngrx/store';
import * as PokemonsActions from "../actions/pokemons.actions";
import { Pokemon } from '../models/pokemon.model';

const initialState: ReadonlyArray<Pokemon> = [];

export const pokemonsReducer = createReducer(
    initialState, 
    on(PokemonsActions.retrievedPokemonList, (state, {pokemons}) => pokemons)
);