import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PokemonAction from './pokemon.action';
import { catchError, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Injectable()
export class PokemonEffect {
  private api = inject(PokemonService);
  actions$ = inject(Actions);

  // Effect for loading Pokémon list
  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonAction.loadPokemon),
      switchMap(({ offset, limit }) =>
        this.api.getPokemonList(offset, limit).pipe(
          map((res) => PokemonAction.getPokemonSuccess({ pokemon: res })),
          catchError((err: { message: string }) =>
            of(
              PokemonAction.errorPokemon({
                errorMessage: err.message || 'Fail to Load Pokemon',
              })
            )
          )
        )
      )
    )
  );

  // Effect for loading Pokémon details
  loadPokemonDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonAction.getPokemonSuccess),
      mergeMap(({ pokemon }) =>
        forkJoin(
          pokemon.map((item) => this.api.getPokemonDetails(item.name))
        ).pipe(
          map((detailsList) => {
            return PokemonAction.getPokemonDetailSuccess({
              pokemonDetailList: detailsList,
            });
          }),
          catchError((err: { message: string }) =>
            of(
              PokemonAction.errorPokemonDetail({
                errorMessage: err.message || 'Fail to Load Pokemon Details',
              })
            )
          )
        )
      )
    );
  });
  // Effect for loading by id Pokémon details

  loadPokemonById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonAction.setPokemonDetailById),
      switchMap(({ id }) =>
        this.api.getPokemonDetails(id).pipe(
          map((res) =>
            PokemonAction.pokemonDetailByIdSuccess({ pokemonDetails: res })
          ),
          catchError((err: { message: string }) =>
            of(
              PokemonAction.errorPokemon({
                errorMessage: err.message || 'Fail to Load Pokemon',
              })
            )
          )
        )
      )
    )
  );
}
