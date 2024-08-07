import { createReducer, on } from '@ngrx/store';
import * as PokemonAction from './pokemon.action';
import { PokemonDetail, PokemonList } from '../pokemon.type';
export interface PokemonState {
  pokemon: PokemonList[];
  pokemonDetailList: PokemonDetail[];
  pokemonDetails: PokemonDetail;
  error: string | null;
  loading: boolean;
}

export const injectPokemonState: PokemonState = {
  pokemon: [],
  pokemonDetailList: [],
  pokemonDetails: {} as PokemonDetail,
  loading: false,
  error: '',
};

export const ProductReducer = createReducer(
  injectPokemonState,
  on(PokemonAction.loadPokemon, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(PokemonAction.loadPokemonSuccess, (state, { pokemon }) => ({
    ...state,
    pokemon,
    error: '',
  })),
  on(PokemonAction.loadPokemonFailure, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
  })),

  // pokemon by details list
  on(
    PokemonAction.loadPokemonDetailSuccess,
    (state, { pokemonDetailList }) => ({
      ...state,
      pokemonDetailList,
      error: '',
    })
  ),
  on(PokemonAction.loadPokemonDetailFailure, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
  })),

  // pokemon by details
  on(PokemonAction.loadPokemonDetailById, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(
    PokemonAction.loadPokemonDetailByIdSuccess,
    (state, { pokemonDetails }) => ({
      ...state,
      pokemonDetails,
      loading: false,
      error: '',
    })
  ),
  on(PokemonAction.loadPokemonDetailByIdFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    error: errorMessage,
  }))
);
