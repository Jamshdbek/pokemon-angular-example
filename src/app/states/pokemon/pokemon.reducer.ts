import { createReducer, on } from '@ngrx/store';
import { PokemonDetail, PokemonList } from '../../shared/types/pokemon.type';
import * as PokemonAction from './pokemon.action';
export interface PokemonState {
  pokemon: PokemonList[];
  pokemonDetailList: PokemonDetail[];
  error: string | null;
}

export const injectPokemonState: PokemonState = {
  pokemon: [],
  pokemonDetailList: [],
  error: '',
};

export const ProductReducer = createReducer(
  injectPokemonState,
  on(PokemonAction.getPokemonSuccess, (state, { pokemon }) => ({
    ...state,
    pokemon,
    error: '',
  })),
  on(PokemonAction.errorPokemon, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
  })),
  // pokemon by details
  on(PokemonAction.getPokemonDetailSuccess, (state, { pokemonDetailList }) => ({
    ...state,
    pokemonDetailList,
    error: '',
  })),
  on(PokemonAction.errorPokemonDetail, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
  }))
);
