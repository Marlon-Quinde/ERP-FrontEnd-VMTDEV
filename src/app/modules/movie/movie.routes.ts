import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'now-playing',
    loadComponent: () => import('./pages/now-playing/now-playing').then( c => c.NowPlaying)
  },
  {
    path: '**',
    redirectTo: 'now-playing',
    pathMatch: 'full'
  }
]
