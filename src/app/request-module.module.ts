import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PokemonService } from './services/pokemon.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [PokemonService, provideHttpClient(withInterceptorsFromDi())],
})
export class RequestModule {}
