import { Component, Input } from '@angular/core';
import { PokemonDetail } from '../../../../shared/types/pokemon.type';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() pokemonItem?: PokemonDetail;
}
