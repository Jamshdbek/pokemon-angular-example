import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  inject,
} from '@angular/core';
import { PokemonDetail } from '../../../pokemon.type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  router = inject(Router);
  @Input() pokemonItem?: PokemonDetail;
  constructor(private route: ActivatedRoute) {}
  handleNavigate(id: number | string): void {
    if (id) {
      this.router.navigate(['/pokemon', id], { relativeTo: this.route });
    }
  }
}
