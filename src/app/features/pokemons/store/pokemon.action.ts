import { createAction, props } from '@ngrx/store';
import { PokemonDetail, PokemonList } from '../pokemon.type';

export const loadPokemon = createAction(
  '[Pokemon] Load Pokemon',
  props<{ offset: number; limit: number }>()
);
export const loadPokemonSuccess = createAction(
  '[Pokemon] Get Pokemon',
  props<{ pokemons: PokemonList[] }>()
);
export const loadPokemonFailure = createAction(
  '[Pokemon] Error Pokemon',
  props<{ errorMessage: string }>()
);

// pokemon details
export const loadPokemonDetail = createAction(
  '[Pokemon] Load PokemonDetail',
  props<{ pokemonDetailList: PokemonDetail[] }>()
);
export const loadPokemonDetailSuccess = createAction(
  '[Pokemon] Get PokemonDetailList',
  props<{ pokemonDetailList: PokemonDetail[] }>()
);
export const loadPokemonDetailFailure = createAction(
  '[Pokemon] Error PokemonDetailError',
  props<{ errorMessage: string }>()
);

//  by id
export const loadPokemonDetailById = createAction(
  '[Pokemon]  setPokemonDetailById',
  props<{ id: string | number }>()
);
export const loadPokemonDetailByIdSuccess = createAction(
  '[Pokemon] Get pokemonDetailByIdSuccess',
  props<{ pokemonDetails: PokemonDetail }>()
);
export const loadPokemonDetailByIdFailure = createAction(
  '[Pokemon] Error pokemonDetailByIdError',
  props<{ errorMessage: string }>()
);
