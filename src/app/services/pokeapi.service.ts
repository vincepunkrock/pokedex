import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbilityDetails } from '../models/abilityDetails.model';
import { EvolutionChainDetails } from '../models/evolutionChainDetails';
import { Pokemon } from '../models/pokemon.model';
import { PokemonDetails } from '../models/pokemonDetails.model';
import { PokemonListResponse } from '../models/pokemonListResponse.model';
import { SpeciesDetails } from '../models/speciesDetails.model';

@Injectable()
export class PokeapiService {

  constructor(private http: HttpClient) {}

  getPokemons(url: string): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(url);
  }
  
  getPokemonFromUrl(url: string): Observable<Pokemon> {
    return this.http.get<PokemonDetails>(url)
      .pipe(map((result) => {
        return {
          name: result.name,
          url: url,
          details: result
        };
      }));
  }

  getAbilityFromUrl(url: string): Observable<AbilityDetails> {
    return this.http.get<AbilityDetails>(url);
  }

  getSpeciesFromUrl(url: string): Observable<SpeciesDetails> {
    return this.http.get<SpeciesDetails>(url);
  }

  getEvolutionChainFromUrl(url: string): Observable<EvolutionChainDetails> {
    return this.http.get<EvolutionChainDetails>(url);
  }
}
