import { inject } from '@angular/core';
import { PokemonList } from '../pokemon.type';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PokemonService } from '../pokemon.service';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
type PokemonStoreSignal = {
  pokemon: PokemonList[];
  isLoading: boolean;
  error: string;
};

const initialState: PokemonStoreSignal = {
  pokemon: [],
  isLoading: false,
  error: '',
};

export const PokemonSignalStore = signalStore(
  withState(initialState),
  withMethods((store, apiService = inject(PokemonService)) => ({
    loadPokemonQuery: rxMethod(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) => {
          return apiService.getPokemonList(0, 10).pipe(
            tapResponse({
              next: (pokemon: PokemonList[]) => {
                return patchState(store, { pokemon, isLoading: false });
              },
              error: (err: string) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
  }))
);
