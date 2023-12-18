import { createFeatureSelector } from "@ngrx/store";
import { Pokemon } from "../models/pokemon.model";

export const getSelectedPokemon = createFeatureSelector<Pokemon>('pokemon');