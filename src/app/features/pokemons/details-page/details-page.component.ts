import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent {}
