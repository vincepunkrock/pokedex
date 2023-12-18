import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

import { pokemonReducer } from './reducers/pokemon.reducer';
import { pokemonsReducer } from './reducers/pokemons.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AppState } from './app.state';
import { listReducer } from './reducers/list.reducer';
import { PokeapiService } from './services/pokeapi.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot<AppState>({
      pokemon: pokemonReducer,
      pokemons: pokemonsReducer,
      listState: listReducer
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatChipsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  providers: [PokeapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
