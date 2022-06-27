import { Pokemon } from "./pokemon.model";

export interface PokemonListResponse {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}