import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPokemons } from './selectors/pokemons.selectors';
import { retrievedPokemonList } from './actions/pokemons.actions';
import { PokeapiService } from './services/pokeapi.service';

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
    this.pokeapiService
      .getPokemons()
      .subscribe((pokemons) => this.store.dispatch(retrievedPokemonList({ pokemons })));
  }
}
