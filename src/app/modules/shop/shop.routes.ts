import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'catalog',
    loadComponent: () => import('./pages/shop-catalog/shop-catalog').then( c => c.ShopCatalog)
  },
  {
    path: 'shop-cart',
    loadComponent: () => import('./pages/shop-cart/shop-cart').then( c => c.ShopCart)
  },
  {
    path: '**',
    redirectTo: 'catalog',
    pathMatch: 'full'
  }
]
