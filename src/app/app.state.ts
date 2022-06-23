import { Pokemon } from "./models/pokemon.model";

export interface AppState {
    readonly pokemons: Pokemon[];
    readonly selectedPokemon: Pokemon;
}