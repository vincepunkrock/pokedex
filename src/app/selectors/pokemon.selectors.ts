import { createFeatureSelector } from "@ngrx/store";
import { Pokemon } from "../models/pokemon.model";

export const selectedPokemon = createFeatureSelector<Pokemon>('pokemon');