import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgClass } from '@angular/common';
import { PokemonDetail } from '../pokemon.type';
import { PokemonActions, PokemonSelectors } from '../store';
import { RouterModule } from '@angular/router';
import { PokemonSignalStore } from '../pokemon.store';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent, RouterModule, AsyncPipe, NgClass],
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
    PokemonSelectors.selectAllPokemonDetail
  );

  public isLoading = signal(false);
  private offset = signal(0);

  public error$: Observable<void> = this.store.select(
    PokemonSelectors.selectPokemonError
  );

  constructor() {
    this.store.dispatch(
      PokemonActions.loadPokemon({ offset: this.offset(), limit: 6 })
    );

    this.pokemonSignalStore.loadPokemonQuery({
      offset: this.offset(),
      limit: 6,
    });

    this.pokemonList$.subscribe(() => {
      this.isLoading.update(() => false);
    });
    this.pokemonList$.subscribe((res) => {
      console.log(res, 'come to data');
    });
  }
  handleShowMore(): void {
    this.offset.update((x) => x + 6);
    this.isLoading.update(() => true);
    this.store.dispatch(
      PokemonActions.loadPokemon({
        offset: 0,
        limit: this.offset(),
      })
    );
  }
}
