import { createReducer, on } from '@ngrx/store';
import  {PokemonActions} from './';
import { PokemonDetail, PokemonList } from '../pokemon.type';
export interface PokemonState {
  pokemon: PokemonList[];
  pokemonDetailList: PokemonDetail[];
  pokemonDetails: PokemonDetail | undefined;
  error: string | null;
  loading: boolean;
}

export const initialState: PokemonState = {
  pokemon: [],
  pokemonDetailList: [],
  pokemonDetails: undefined,
  loading: false,
  error: '',
};

export const ProductReducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemon, (state): PokemonState => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(PokemonActions.loadPokemonSuccess, (state, { pokemon }): PokemonState => ({
    ...state,
    pokemon,
    loading: false,
    error: '',
  })),
  on(PokemonActions.loadPokemonFailure, (state, { errorMessage }): PokemonState => ({
    ...state,
    loading: false,
    error: errorMessage,
  })),

  // pokemon by details list
  on(
    PokemonActions.loadPokemonDetailSuccess,
    (state, { pokemonDetailList }): PokemonState => ({
      ...state,
      pokemonDetailList,
      loading: false,
      error: '',
    })
  ),
  on(PokemonActions.loadPokemonDetailFailure, (state, { errorMessage }): PokemonState => ({
    ...state,
    loading: false,
    error: errorMessage,
  })),

  // pokemon by details
  on(PokemonActions.loadPokemonDetailById, (state): PokemonState => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(
    PokemonActions.loadPokemonDetailByIdSuccess,
    (state, { pokemonDetails }): PokemonState => ({
      ...state,
      pokemonDetails,
      loading: false,
      error: '',
    })
  ),
  on(PokemonActions.loadPokemonDetailByIdFailure, (state, { errorMessage }): PokemonState => ({
    ...state,
    loading: false,
    error: errorMessage,
  }))
);
