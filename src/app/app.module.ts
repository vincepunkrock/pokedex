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

import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatIconModule,
  ],
  providers: [PokeapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
