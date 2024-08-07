import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PokemonDetail, PokemonList } from './pokemon.type';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';
  private http = inject(HttpClient);

  constructor() {}

  public getPokemonList(
    offset: number,
    limit: number
  ): Observable<PokemonList[]> {
    return this.http
      .get<PokemonList[]>(
        this.baseUrl + 'pokemon?limit=' + limit + '&offset=' + offset
      )
      .pipe(map((x: any) => x.results));
  }

  public getPokemonDetails(
    pokemon: number | string
  ): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(this.baseUrl + 'pokemon/' + pokemon);
  }
}
