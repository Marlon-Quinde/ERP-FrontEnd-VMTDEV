import { inject, Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { last, of } from 'rxjs';
import { URL_ROUTES } from '../../shared/const/url-routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  private readonly _router = inject(Router)

  getRoutes() {
    return of<MenuItem[]>([
      {
        label: 'Home',
        icon: 'pi pi-home',
        badge: '1',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-bolt',
            command: () => this._router.navigateByUrl(URL_ROUTES.DASHBOARD)
          }
        ]
      },
      {
        label: 'Peliculas',
        icon: 'pi pi-search',
        badge: '1',
        items: [
          {
            label: 'En cartelera',
            icon: 'pi pi-bolt',
            command: () => this._router.navigateByUrl(URL_ROUTES.NOW_PLAYING)
          },
          // {
          //   label: 'ERP',
          //   icon: 'pi pi-server',
          // },
          // {
          //   separator: true,
          // },
          // {
          //   label: 'CMS',
          //   icon: 'pi pi-pencil',
          // },
        ],
      },
      {
        label: 'Administración',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Productos',
            icon: 'pi pi-search',
            // routerLink: '/admin/product/list'
            command: () => this._router.navigateByUrl(URL_ROUTES.PRODUCT_LIST)
          }
        ]
      }
    ]);
  }
}
