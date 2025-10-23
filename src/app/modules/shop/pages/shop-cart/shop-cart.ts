import { Component, inject, signal } from '@angular/core';
import { CustomTitle } from '../../../shared/components/custom-title/custom-title';
import { CustomTable } from '../../../shared/components/custom-table/custom-table';
import { LocalStorageService } from '../../../shared/services/localStorage.service';
import { IShopCart } from '../../interfaces/IShopCart.interface';
import { Router } from '@angular/router';
import { EnumKeys } from '../../../shared/enums/keys';
import { URL_ROUTES } from '../../../shared/const/url-routes';
import { IColumn, IFooter } from '../../../shared/interfaces/ICustomTable.interface';
import { environments } from '../../../../environments/environments';

@Component({
  selector: 'app-shop-cart',
  imports: [CustomTitle, CustomTable],
  templateUrl: './shop-cart.html',
  styleUrl: './shop-cart.scss',
})
export class ShopCart {
  private readonly localStorage = inject(LocalStorageService);
  private readonly _router = inject(Router);
  public shopCart = signal<IShopCart[]>([]);

  public columns: IColumn[] = [
    {
      header: 'ID',
      field: 'prodId',
    },
    {
      header: 'Nombre',
      field: 'prodDescripcion',
    },
    {
      header: 'Cantidad',
      field: 'cantidad',
    },
    {
      header: 'Precio X Unidad',
      field: 'prodUltPrecio',
      format: {
        type: 'currency',
      },
    },
    {
      header: 'Subtotal',
      field: '',
      format: {
        type: 'currency',
      },
      operation: {
        columns: ['cantidad', '*', 'prodUltPrecio'],
      },
    },
    {
      header: `IVA %${environments.IVA}`,
      field: '',
      format: {
        type: 'currency',
      },
      operation: {
        columns: ['cantidad', '*', 'prodUltPrecio', '*', environments.IVA],
      },
    },

    {
      header: 'Total',
      field: '',
      format: {
        type: 'currency',
      },
      operation: {
        columns: ['cantidad', '*', 'prodUltPrecio', '*', (1 + environments.IVA)],
      },
    },
  ];

  public footer: IFooter[] = [
    {
      colspan: 4,
      label: 'Total a pagar',
    },
    {
      colspan: 1,
      operation: {
        columns: ['cantidad', '*', 'prodUltPrecio'],
      },
      format: {
        type: 'currency',
      },
    },
    {
      colspan: 1,
      operation: {
        columns: ['cantidad', '*', 'prodUltPrecio', '*', environments.IVA],
      },
      format: {
        type: 'currency',
      },
    },

    {
      colspan: 1,
      operation: {
        columns: ['cantidad', '*', 'prodUltPrecio', '*', (1 + environments.IVA)],
      },
      format: {
        type: 'currency',
      },
    },
  ];

  ngOnInit(): void {
    const shopCard = this.localStorage.getItem<IShopCart[]>(EnumKeys.SHOPCART);
    if (shopCard?.length) {
      this.shopCart.set(shopCard);
    } else {
      this._router.navigateByUrl(URL_ROUTES.CATALOG);
    }
  }
}
