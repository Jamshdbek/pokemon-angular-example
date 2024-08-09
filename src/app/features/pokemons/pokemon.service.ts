import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { PokemonDetail, PokemonServiceGetType } from './pokemon.type';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';
  private http = inject(HttpClient);

  public getPokemonList(offset: number, limit: number) {
    return this.http
      .get<PokemonServiceGetType>(
        this.baseUrl + 'pokemon?limit=' + limit + '&offset=' + offset
      )
      .pipe(map((x) => x.results));
  }

  public getPokemonDetails(pokemon: number | string) {
    return this.http.get<PokemonDetail>(this.baseUrl + 'pokemon/' + pokemon);
  }
}
