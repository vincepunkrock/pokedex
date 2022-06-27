import { ListState } from "./models/listState.model";
import { Pokemon } from "./models/pokemon.model";

export interface AppState {
    readonly pokemons: Pokemon[];
    readonly pokemon: Pokemon;
    readonly listState: ListState;
}