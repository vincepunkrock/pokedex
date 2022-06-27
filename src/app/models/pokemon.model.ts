import { PokemonDetails } from "./pokemonDetails.model";

export interface Pokemon {
    name: string;
    url: string;

    details?: PokemonDetails;
}