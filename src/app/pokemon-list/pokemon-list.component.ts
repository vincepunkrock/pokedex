import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemons: ReadonlyArray<Pokemon> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
