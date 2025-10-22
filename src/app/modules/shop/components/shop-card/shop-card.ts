import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../../product/interfaces/IProduct.interface';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { IShopCart } from '../../interfaces/IShopCart.interface';
import { LocalStorageService } from '../../../shared/services/localStorage.service';
import { EnumKeys } from '../../../shared/enums/keys';

@Component({
  selector: 'app-shop-card',
  imports: [CurrencyPipe],
  templateUrl: './shop-card.html',
  styleUrl: './shop-card.scss',
})
export class ShopCard {
  @Input({ required: true }) product!: IProduct;
  private readonly _toastr = inject(ToastrService);
  private readonly localStorage = inject(LocalStorageService);

  addShopCart(item: IProduct) {
    if (!item) {
      this._toastr.warning('Producto no valido');
      return;
    }

    let newItem: IShopCart = {
      ...item,
      cantidad: 1,
    };
    let newShopCart: IShopCart[] = [];

    let shopCart = this.localStorage.getItem<IShopCart[]>(EnumKeys.SHOPCART);

    if (shopCart?.length) {
      // ? Logica cuando existe el carrito de compras
      newShopCart = structuredClone(shopCart);
      const existeItem = shopCart.find((i) => i.prodId == newItem.prodId);
      if (existeItem) {
        // ! 3
        // ? Cuando ya existe el mismo producto en mi carrito
        newShopCart.forEach((i) => {
          if (i.prodId == existeItem.prodId) {
            i.cantidad++
          }
        });
      } else {
        // ! 2
        // ? Cuando es un producto totalmente nuevo
        newShopCart.push(newItem);
      }
    } else {
      // ! 1
      // ? Cuando no existe el carrito de compras
      newShopCart.push(newItem);
    }

    this.localStorage.setItem(EnumKeys.SHOPCART, newShopCart);
  }
}
