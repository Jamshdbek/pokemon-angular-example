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
import { PokemonDetail } from '../pokemon.type';
import * as PokemonAction from '../store/pokemon.action';
import * as PokemonSelector from '../store/pokemon.selector';
import { Router, RouterModule } from '@angular/router';
import { PokemonSignalStore } from '../signalStore/pokemon.store';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent, CommonModule, RouterModule],
  providers: [PokemonSignalStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  router = inject(Router);
  // classic store
  store = inject(Store);
  // signal store
  public pokemonSignalStore = inject(PokemonSignalStore);
  // observables
  public pokemonDataBySignal = this.pokemonSignalStore.pokemon;
  public pokemonList$: Observable<PokemonDetail[]> = this.store.select(
    PokemonSelector.selectAllPokemonDetail
  );
  public isLoading = this.store.select(PokemonSelector.selectLoading);
  public error$: Observable<void> = this.store.select(
    PokemonSelector.selectPokemonError
  );
  public offset = signal(0);
  constructor() {
    console.log(this.pokemonSignalStore.pokemon, 'pokemon data');
  }
  ngOnInit(): void {
    this.store.dispatch(
      PokemonAction.loadPokemon({ offset: this.offset(), limit: 6 })
    );
    // fetch request signal ----------------------------------------------
    this.pokemonSignalStore.loadPokemonQuery({ offset: 0, limit: 6 });
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
