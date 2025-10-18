import { Component, inject, signal } from '@angular/core';
import { CustomTitle } from '../../../shared/components/custom-title/custom-title';
import { ProductService } from '../../../product/services/product.service';
import { IProduct } from '../../../product/interfaces/IProduct.interface';
import { ShopCard } from '../../components/shop-card/shop-card';

@Component({
  selector: 'app-shop-catalog',
  imports: [CustomTitle, ShopCard],
  templateUrl: './shop-catalog.html',
  styleUrl: './shop-catalog.scss'
})
export class ShopCatalog {
  private readonly _productService = inject(ProductService)

  public products = signal<IProduct[]>([])

  ngOnInit(): void {
    this._productService.getListProducts().subscribe({
      next: (listProducts) => {
        this.products.set(listProducts.data ?? [])
      }
    })

  }
}
