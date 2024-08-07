import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { PokemonEffect } from './features/pokemons/store/pokemon.effect';
import { ProductReducer } from './features/pokemons/store/pokemon.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'pokemon', reducer: ProductReducer }),
    provideEffects(PokemonEffect),
    provideHttpClient(),
  ],
};
