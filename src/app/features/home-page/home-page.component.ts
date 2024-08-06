import { Component } from '@angular/core';
import { CardComponent } from "./components/card/card.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
