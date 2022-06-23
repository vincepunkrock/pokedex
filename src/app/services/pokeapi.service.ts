import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Array<Pokemon>> {
    return this.http
      .get<{ items: Pokemon[] }>(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=150'
      )
      .pipe(map((result) => result.items || []));
  }
}
