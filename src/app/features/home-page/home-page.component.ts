import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { PokemonService } from '../../services/pokemon.service';
import { Observable } from 'rxjs';
import { PokemonDetail, PokemonList } from '../../shared/types/pokemon.type';
import { Store } from '@ngrx/store';
import * as PokemonAction from '../../states/pokemon/pokemon.action';
import * as PokemonSelector from '../../states/pokemon/pokemon.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  public pokemonList$!: Observable<PokemonDetail[]>;
  public error$!: Observable<void>;
  public offset: number = 0;
  public isLoading: boolean = false;
  constructor(private store: Store<{ cart: { pokemon: PokemonList[] } }>) {
    this.pokemonList$ = this.store.select(
      PokemonSelector.selectAllPokemonDetail
    );
    this.error$ = this.store.select(PokemonSelector.selectPokemonError);
  }

  ngOnInit(): void {
    this.store.dispatch(PokemonAction.loadPokemon({ offset: 0, limit: 6 }));
  }
}
