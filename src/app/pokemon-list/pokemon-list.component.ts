import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemons: ReadonlyArray<Pokemon> = [];
  @Output() selected: EventEmitter<Pokemon> = new EventEmitter();

  pageSize: number = 150;
  pageIndex: number = 0;
  length: number = 1154;

  constructor() { }

  ngOnInit(): void {
  }

  pageChanged(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.pageIndex = pageEvent.pageIndex;
  }

  select(pokemon: Pokemon) {
    this.selected.emit(pokemon);
  }

}
