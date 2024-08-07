import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PokemonDetail } from '../pokemon.type';
import { Store } from '@ngrx/store';
import * as PokemonAction from '../store/pokemon.action';
import * as PokemonSelector from '../store/pokemon.selector';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  private routerSub: Subscription | undefined;
  public pokemonDetails$!: Observable<PokemonDetail>;
  public object?: PokemonDetail;
  constructor(
    private route: ActivatedRoute,
    private store: Store<PokemonDetail>
  ) {
    this.pokemonDetails$ = this.store.select(
      PokemonSelector.selectAllPokemonDetailById
    );
    this.pokemonDetails$.subscribe((res) => {
      this.object = res;
    });
  }

  ngOnInit(): void {
    this.routerSub = this.route.params.subscribe((params) => {
      this.store.dispatch(
        PokemonAction.setPokemonDetailById({ id: params['id'] })
      );
    });
  }
  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
