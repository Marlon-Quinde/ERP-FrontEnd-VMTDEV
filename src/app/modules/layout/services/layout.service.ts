import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  getRoutes() {
    return of<MenuItem[]>([
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Proyectos',
        icon: 'pi pi-search',
        badge: '3',
        items: [
          {
            label: 'UX - Desing',
            icon: 'pi pi-bolt',
          },
          {
            label: 'ERP',
            icon: 'pi pi-server',
          },
          {
            separator: true,
          },
          {
            label: 'CMS',
            icon: 'pi pi-pencil',
          },
        ],
      },
    ]);
  }
}
