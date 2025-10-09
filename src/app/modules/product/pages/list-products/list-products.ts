import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/IProduct.interface';
import { CustomTable } from '../../../shared/components/custom-table/custom-table';
import { IColumn } from '../../../shared/interfaces/ICustomTable.interface';

@Component({
  selector: 'app-list-products',
  imports: [CustomTable],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss'
})
export class ListProducts implements OnInit {

  private readonly _productService = inject(ProductService)
  public products = signal<IProduct[]>([])
  public columns: IColumn[] = [
    {
      header: 'ID',
      field: 'prodId'
    },
    {
      header: 'Nombre',
      field: 'prodDescripcion'
    },
    {
      header: 'Precio',
      field: 'prodUltPrecio',
      format: 'currency'
    },
    {
      header: 'Fecha Creación',
      field: 'fechaHoraAct',
      format: 'date',
      params: 'yyyy-MM-dd'
    }
  ]

  ngOnInit(): void {
    this._productService.getListProducts().subscribe({
      next: (res) => {
        this.products.set(res.data ?? [])
      }
    })
  }

}
