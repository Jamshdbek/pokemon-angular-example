import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { DetailsPageComponent } from './features/details-page/details-page.component';

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
