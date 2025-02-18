import { Routes } from '@angular/router';
import { adminGuard, isAuthorizedForBranch, privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [publicGuard()],
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
