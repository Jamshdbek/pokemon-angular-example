import { createAction, props } from '@ngrx/store';
import { PokemonDetail, PokemonList } from '../pokemon.type';
export const loadPokemon = createAction(
  '[Pokemon] Load Pokemon',
  props<{ offset: number; limit: number }>()
);

export const getPokemonSuccess = createAction(
  '[Pokemon] Get Pokemon',
  props<{ pokemon: PokemonList[] }>()
);

export const errorPokemon = createAction(
  '[Pokemon] Error Pokemon',
  props<{ errorMessage: string }>()
);

// pokemon details
export const loadPokemonDetail = createAction(
  '[Pokemon] Load PokemonDetail',
  props<{ name: string }>()
);

export const getPokemonDetailSuccess = createAction(
  '[Pokemon] Get PokemonDetailList',
  props<{ pokemonDetailList: PokemonDetail[] }>()
);

export const errorPokemonDetail = createAction(
  '[Pokemon] Error PokemonDetailError',
  props<{ errorMessage: string }>()
);
