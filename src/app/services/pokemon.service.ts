import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PokemonDetail, PokemonList } from '../shared/types/pokemon.type';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';
  http: HttpClient = inject(HttpClient);
  constructor(private _httpClient: HttpClient) {}

  public getPokemonList(
    offset: number,
    limit: number
  ): Observable<PokemonList[]> {
    return this._httpClient
      .get<PokemonList[]>(
        this.baseUrl + 'pokemon?limit=' + limit + '&offset=' + offset
      )
      .pipe(map((x: any) => x.results));
  }
  public getPokemonDetails(
    pokemon: number | string
  ): Observable<PokemonDetail> {
    return this._httpClient.get<PokemonDetail>(
      this.baseUrl + 'pokemon/' + pokemon
    );
  }
}
