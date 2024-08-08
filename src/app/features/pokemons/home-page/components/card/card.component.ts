import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { PokemonDetail } from '../../../pokemon.type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
})
export class CardComponent {
  private router = inject(Router);
  public pokemonItem = input.required<PokemonDetail>();
  // @Input() pokemonItem?: PokemonDetail;

  constructor(private route: ActivatedRoute) {}
  handleNavigate(id: number | string): void {
    if (id) {
      this.router.navigate(['/pokemon', id], { relativeTo: this.route });
    }
  }
}
