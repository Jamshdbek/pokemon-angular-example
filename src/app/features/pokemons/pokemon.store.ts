import { inject } from '@angular/core';
import { FilterPokemonList, PokemonList } from './pokemon.type';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PokemonService } from './pokemon.service';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type PokemonState = {
  pokemon: PokemonList[];
  isLoading: boolean;
  error: string;
};

const initialState: PokemonState = {
  pokemon: [],
  isLoading: false,
  error: '',
};

export const PokemonSignalStore = signalStore(
  withState(initialState),
  withMethods((store, apiService = inject(PokemonService)) => ({
    loadPokemonQuery: rxMethod<FilterPokemonList>(
      pipe(
        switchMap((query) =>
          apiService.getPokemonList(query.offset, query.limit).pipe(
            tapResponse({
              next: (pokemon) => {
                patchState(store, { pokemon, isLoading: false });
              },
              error: (err: string) => {
                patchState(store, { error: err, isLoading: false });
                console.error(err);
              },
            })
          )
        )
      )
    ),
  }))
);
