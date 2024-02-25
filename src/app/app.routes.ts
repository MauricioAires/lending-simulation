import { Routes } from '@angular/router';
import { SuccessLeanComponent } from './pages/success-lean/success-lean.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'sucesso', component: SuccessLeanComponent },
  { path: '**', component: HomeComponent },
];
