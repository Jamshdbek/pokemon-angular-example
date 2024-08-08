import { Component, OnInit, effect } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { PokemonService } from '../../services/pokemon.service';
import { Observable, forkJoin } from 'rxjs';
import { PokemonDetail, PokemonList } from '../../shared/types/pokemon.type';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  public PokemonList: PokemonDetail[] = [];
  public offset: number = 6;
  public isLoading: boolean = false;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPage(0);
  }

  getPage(offset: number) {
    if (!this.isLoading) {
      this.isLoading = true;
      this.pokemonService
        .getPokemonList(offset, 6)
        .subscribe((list: PokemonList[]) => {
          if (list.length === 0) {
            this.isLoading = true;
          }
          if (list) {
            this.getPokemon(list);
          }
        });
    }
  }

  onScroll(event: Event): void {
    const element: HTMLDivElement = event.target as HTMLDivElement;
    if (element.scrollHeight - element.scrollTop < 1000) {
      this.getPage(this.offset);
    }
  }

  private getPokemon(list: PokemonList[]) {
    const arr: Observable<PokemonDetail>[] = [];
    list.map((value: PokemonList) => {
      arr.push(this.pokemonService.getPokemonDetails(value.name));
    });

    forkJoin([...arr]).subscribe((pokemons: PokemonDetail[]) => {
      console.log(pokemons, 'pokemon ists');
      this.PokemonList.push(...pokemons);
      this.offset += 20;
      this.isLoading = false;
    });
  }
}
