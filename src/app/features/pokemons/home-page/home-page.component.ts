import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { PokemonDetail, PokemonList } from '../pokemon.type';
import * as PokemonAction from '../store/pokemon.action';
import * as PokemonSelector from '../store/pokemon.selector';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent, CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  public pokemonList$!: Observable<PokemonDetail[]>;
  router = inject(Router);
  public error$!: Observable<void>;
  public offset = signal(0);
  public isLoading = false;
  constructor(private store: Store<{ cart: { pokemon: PokemonList[] } }>) {
    this.pokemonList$ = this.store.select(
      PokemonSelector.selectAllPokemonDetail
    );
    this.error$ = this.store.select(PokemonSelector.selectPokemonError);
  }

  ngOnInit(): void {
    this.store.dispatch(
      PokemonAction.loadPokemon({ offset: this.offset(), limit: 6 })
    );
  }
  handleShowMore(): void {
    this.offset() + 6;
    this.store.dispatch(
      PokemonAction.loadPokemon({
        offset: 0,
        limit: this.offset(),
      })
    );
  }
}
