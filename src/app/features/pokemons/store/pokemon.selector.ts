import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from './pokemon.reducer';

export const selectorPokemonFeature =
  createFeatureSelector<PokemonState>('pokemon');

export const selectAllPokemon = createSelector(
  selectorPokemonFeature,
  (state) => state.pokemon
);
export const selectAllPokemonDetail = createSelector(
  selectorPokemonFeature,
  (state) => state.pokemonDetailList
);
export const selectPokemonError = createSelector(
  selectorPokemonFeature,
  (state) => {
    state.error;
  }
);

export const selectLoading = createSelector(
  selectorPokemonFeature,
  (state) => state.loading
);
export const selectAllPokemonDetailById = createSelector(
  selectorPokemonFeature,
  (state) => state.pokemonDetails
);
export const selectPokemonErrorById = createSelector(
  selectorPokemonFeature,
  (state) => {
    state.error;
  }
);
