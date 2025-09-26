import { Routes } from '@angular/router';
import { authGuard } from './modules/shared/guards/auth.guard';
import { noAuthGuard } from './modules/shared/guards/noAuth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [noAuthGuard],
    loadChildren: () => import('./modules/auth/auth.routes').then( r => r.routes)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/layout/pages/main/main').then( c => c.Main),
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home/home.routes').then( r => r.routes),
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
