import { createReducer, on } from '@ngrx/store';
import * as PokemonActions from "../actions/pokemon.actions";
import { Pokemon } from '../models/pokemon.model';

const initialState: Pokemon = {
    name: "",
    url: "",
    details: undefined
};

export const pokemonReducer = createReducer(
    initialState, 
    on(PokemonActions.selectPokemon, (state, {pokemon}) => pokemon)
);