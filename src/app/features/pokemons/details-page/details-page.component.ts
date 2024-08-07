import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  store = inject(Store);
  private routerSub: Subscription | undefined;
  public isLoading$ = this.store.select(PokemonSelector.selectLoading);
  pokemonDetails$ = this.store.select(
    PokemonSelector.selectAllPokemonDetailById
  );

  constructor(private route: ActivatedRoute) {
    console.log(
      this.isLoading$.subscribe((res) => {
        console.log(res);
      }),
      'is loading!!!!!!'
    );
  }

  ngOnInit(): void {
    this.store.dispatch(
      PokemonAction.loadPokemonDetailById({
        id: this.route.snapshot.params['id'],
      })
    );
  }
  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
