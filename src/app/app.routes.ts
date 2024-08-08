import { Routes } from '@angular/router';
import { HomePageComponent } from './features/pokemons/home-page/home-page.component';
import { DetailsPageComponent } from './features/pokemons/details-page/details-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'pokemon/:id',
    component: DetailsPageComponent,
  },
  {
    path: '**',
    redirectTo: '', // Redirect to the home page for undefined routes
  },
];
