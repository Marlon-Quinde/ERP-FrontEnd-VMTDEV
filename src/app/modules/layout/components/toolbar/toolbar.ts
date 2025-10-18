import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// ? Modulos de Prime NG
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { LocalStorageService } from '../../../shared/services/localStorage.service';
import { EnumKeys } from '../../../shared/enums/keys';
import { IProduct } from '../../../product/interfaces/IProduct.interface';
import { Router } from '@angular/router';
import { URL_ROUTES } from '../../../shared/const/url-routes';

@Component({
  selector: 'app-toolbar',
  imports: [ CommonModule, MenubarModule, BadgeModule, AvatarModule, InputTextModule, Ripple, ButtonModule, OverlayBadgeModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {

  private readonly localStorage = inject(LocalStorageService)
  private readonly _router = inject(Router)

  @Input() items: MenuItem[] | undefined;

  itemsInShopCart(){
    return ((this.localStorage.getItem(EnumKeys.SHOPCART) ?? []) as Array<IProduct>).length
  }

  goToShopCart(){
    if(this.itemsInShopCart()) {
      this._router.navigateByUrl(URL_ROUTES.SHOP_CART)
    }
  }
}
