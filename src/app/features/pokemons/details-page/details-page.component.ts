import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PokemonAction from '../store/pokemon.action';
import * as PokemonSelector from '../store/pokemon.selector';
import { AsyncPipe } from '@angular/common';
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
  public isLoading$ = this.store.select(PokemonSelector.selectLoading);
  public pokemonDetails$ = this.store.select(
    PokemonSelector.selectAllPokemonDetailById
  );

  constructor() {
    this.store.dispatch(
      PokemonAction.loadPokemonDetailById({
        id: this.route.snapshot.params['id'],
      })
    );
  }
}
