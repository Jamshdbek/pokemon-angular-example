import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { PokemonActions, PokemonSelectors } from '../store';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './details-page.component.html',
})
export class DetailsPageComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  public isLoading$ = this.store.select(PokemonSelectors.selectLoading);
  public pokemonDetails$ = this.store.select(
    PokemonSelectors.selectAllPokemonDetailById
  );

  constructor() {
    this.store.dispatch(
      PokemonActions.loadPokemonDetailById({
        id: this.route.snapshot.params['id'],
      })
    );
  }
}
