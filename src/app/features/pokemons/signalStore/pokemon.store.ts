import { inject } from '@angular/core';
import { FilterPokemonListType, PokemonList } from '../pokemon.type';
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
    loadPokemonQuery: rxMethod<FilterPokemonListType>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query: FilterPokemonListType) =>
          apiService.getPokemonList(query.offset, query.limit).pipe(
            tapResponse({
              next: (pokemon: PokemonList[]) => {
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
