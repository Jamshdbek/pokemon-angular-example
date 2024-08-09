import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
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
import { RouterModule } from '@angular/router';
import { PokemonSignalStore } from '../signalStore/pokemon.store';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent, CommonModule, RouterModule],
  providers: [PokemonSignalStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  // classic store
  private readonly store = inject(Store);
  // signal store
  public pokemonSignalStore = inject(PokemonSignalStore);
  // observables
  public pokemonDataBySignal = this.pokemonSignalStore.pokemon;
  public pokemonList$: Observable<PokemonDetail[]> = this.store.select(
    PokemonSelector.selectAllPokemonDetail
  );

  public isLoading = signal(false);
  private offset = signal(6);

  public error$: Observable<void> = this.store.select(
    PokemonSelector.selectPokemonError
  );

  constructor() {
    this.store.dispatch(
      PokemonAction.loadPokemon({ offset: 0, limit: this.offset() })
    );

    this.pokemonSignalStore.loadPokemonQuery({ offset: 0, limit: 6 });

    this.pokemonList$.subscribe(() => {
      this.isLoading.update(() => false);
    });
  }
  handleShowMore(): void {
    this.offset.update((x) => x + 6);
    this.isLoading.update(() => true);
    this.store.dispatch(
      PokemonAction.loadPokemon({
        offset: 0,
        limit: this.offset(),
      })
    );
  }
}
