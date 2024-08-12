import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonActions } from './';
import { catchError, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Injectable()
export class PokemonEffect {
  private api = inject(PokemonService);
  actions$ = inject(Actions);

  // Effect for loading Pokémon list
  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemon),
      switchMap(({ offset, limit }) =>
        this.api.getPokemonList(offset, limit).pipe(
          map((res) =>
            PokemonActions.loadPokemonSuccess({
              pokemons: res,
            })
          ),
          catchError((err: { message: string }) =>
            of(
              PokemonActions.loadPokemonFailure({
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
      ofType(PokemonActions.loadPokemonSuccess),
      mergeMap(({ pokemons }) =>
        forkJoin(
          pokemons.map((item) => this.api.getPokemonDetails(item.name))
        ).pipe(
          map((detailsList) => {
            return PokemonActions.loadPokemonDetailSuccess({
              pokemonDetailList: detailsList,
            });
          }),
          catchError((err: { message: string }) =>
            of(
              PokemonActions.loadPokemonDetailFailure({
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
      ofType(PokemonActions.loadPokemonDetailById),
      switchMap(({ id }) =>
        this.api.getPokemonDetails(id).pipe(
          map((res) =>
            PokemonActions.loadPokemonDetailByIdSuccess({ pokemonDetails: res })
          ),
          catchError((err: { message: string }) =>
            of(
              PokemonActions.loadPokemonDetailByIdFailure({
                errorMessage: err.message || 'Fail to Load Pokemon',
              })
            )
          )
        )
      )
    )
  );
}
