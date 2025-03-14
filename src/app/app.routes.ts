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
        path: 'movies',
        loadComponent: () => import('./domains/movie/movie.component')
      },
      {
        path: 'test01',
        loadComponent: () => import('./domains/test01/test01.component')
      },
      {
        path: 'test02',
        loadComponent: () => import('./domains/test02/test02.component')
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];
