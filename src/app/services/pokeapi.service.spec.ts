import { TestBed } from '@angular/core/testing';

import { PokeapiService } from './pokeapi.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PokeapiService', () => {
  let service: PokeapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        PokeapiService
      ]
    });
    service = TestBed.inject(PokeapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
