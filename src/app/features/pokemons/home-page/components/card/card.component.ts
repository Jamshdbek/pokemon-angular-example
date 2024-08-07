import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PokemonDetail } from '../../../pokemon.type';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() pokemonItem?: PokemonDetail;
}
