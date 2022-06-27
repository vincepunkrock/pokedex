import { createReducer, on } from '@ngrx/store';
import * as PokedexActions from "../actions/pokedex.actions";
import { Pokemon } from '../models/pokemon.model';

const initialState: Pokemon = {
    name: "",
    url: "",
    details: undefined
};

export const pokedexReducer = createReducer(
    initialState, 
    on(PokedexActions.selectPokemon, (state, {pokemon}) => pokemon)
);