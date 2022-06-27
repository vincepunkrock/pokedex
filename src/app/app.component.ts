import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPokemons } from './selectors/pokemons.selectors';
import { retrievedPokemonList } from './actions/pokemons.actions';
import { selectPokemon } from './actions/pokemon.actions'
import { PokeapiService } from './services/pokeapi.service';
import { Pokemon } from './models/pokemon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pokemons$ = this.store.select(selectPokemons);

  constructor(
    private pokeapiService: PokeapiService,
    private store: Store
  ) {}

  ngOnInit() {
    this.loadPokemonList();
  }

  loadPokemonList(url?: string) {
    this.pokeapiService
    .getPokemons(url)
    .subscribe((response) => {
      this.store.dispatch(retrievedPokemonList({ pokemons: response.results }));
    });
  }

  pokemonSelected(selectedPokemon: Pokemon) {
    this.store.dispatch(selectPokemon({pokemon: selectedPokemon}));
    this.pokeapiService.getPokemonFromUrl(selectedPokemon.url).subscribe((pokemon) => {
      console.log(pokemon);
      this.store.dispatch(selectPokemon({ pokemon }));
    });
  }

  changedPage(change: number) {
    if(change == 1) {
      this.loadPokemonList();
    }
    else if(change == -1) {
      this.loadPokemonList();
    }
  }
}
