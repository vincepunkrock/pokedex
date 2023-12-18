import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Pokemon } from '../models/pokemon.model';
import { getItemCount } from '../selectors/list.selectors';
import { getSelectedPokemon } from '../selectors/pokemon.selectors';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {

  @Input({required: true}) pokemons: ReadonlyArray<Pokemon> = [];
  @Output() selected: EventEmitter<Pokemon> = new EventEmitter();
  @Output() changedPage: EventEmitter<number> = new EventEmitter();

  pageSize: number = 150;
  pageIndex: number = 0;
  itemCount = this.store.selectSignal(getItemCount);
  selectedPokemon = this.store.selectSignal(getSelectedPokemon);

  constructor(
    private store: Store
  ) { }

  pageChanged(pageEvent: PageEvent) {
    this.changedPage.emit(this.pageIndex < pageEvent.pageIndex ? 1 : -1);
    this.pageIndex = pageEvent.pageIndex;
  }

  select(pokemon: Pokemon) {
    this.selected.emit(pokemon);
  }

}
