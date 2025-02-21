import { Routes } from '@angular/router';
import { privateGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./domains/auth/auth.component')
  },
  {
    path: '',
    loadComponent: () => import('./domains/shared/components/layout/layout.component'),
    canActivate: [privateGuard()],
    children: [
      
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];
