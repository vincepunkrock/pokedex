import { Component, effect } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPokemons } from './selectors/pokemons.selectors';
import { getNextUrl, getPreviousUrl, getUrl } from './selectors/list.selectors';
import { retrievedPokemonList } from './actions/pokemons.actions';
import { updateListState } from './actions/list.actions';
import { selectPokemon } from './actions/pokemon.actions'
import { PokeapiService } from './services/pokeapi.service';
import { Pokemon } from './models/pokemon.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Pokedex";
  pokemons = this.store.selectSignal(selectPokemons);
  listUrl = this.store.selectSignal(getUrl);
  prevUrl = this.store.selectSignal(getPreviousUrl);
  nextUrl = this.store.selectSignal(getNextUrl);

  constructor(
    private pokeapiService: PokeapiService,
    private store: Store
  ) {
    effect(() => {
      this.loadPokemonList(this.listUrl());
    })
  }

  loadPokemonList(url: string) {
    this.pokeapiService
    .getPokemons(url)
    .subscribe((response) => {
      this.store.dispatch(retrievedPokemonList({ pokemons: response.results }));
      this.store.dispatch(updateListState({ listState: {itemCount: response.count, url: url!, nextUrl: response.next, previousUrl: response.previous} }));
    });
  }

  pokemonSelected(selectedPokemon: Pokemon) {
    this.store.dispatch(selectPokemon({pokemon: selectedPokemon}));
    this.pokeapiService.getPokemonFromUrl(selectedPokemon.url).subscribe((pokemon) => {
      this.store.dispatch(selectPokemon({ pokemon }));
    });
  }

  changedPage(change: number) {
    if(change == 1) {
      this.loadPokemonList(this.nextUrl());
    }
    else if(change == -1) {
      this.loadPokemonList(this.prevUrl());
    }
  }
}
