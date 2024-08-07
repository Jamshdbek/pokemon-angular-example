import { Routes } from '@angular/router';
import { HomePageComponent } from './features/pokemons/home-page/home-page.component';
import { DetailsPageComponent } from './features/pokemons/details-page/details-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
    children: [
      {
        path: ':id',
        component: DetailsPageComponent,
      },
    ],
  },
  {
    path: '**',
    component: HomePageComponent,
  },
];
