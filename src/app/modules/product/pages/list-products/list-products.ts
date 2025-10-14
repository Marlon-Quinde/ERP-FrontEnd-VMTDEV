import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/IProduct.interface';
import { CustomTable } from '../../../shared/components/custom-table/custom-table';
import { IAccionOutput, IColumn } from '../../../shared/interfaces/ICustomTable.interface';
import { ModalProduct } from '../../components/modal-product/modal-product';

@Component({
  selector: 'app-list-products',
  imports: [CustomTable, ModalProduct],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss'
})
export class ListProducts implements OnInit {

  private readonly _productService = inject(ProductService)
  public products = signal<IProduct[]>([])
  public modalProduct = signal<{ isVisible: boolean, data?: IProduct }>({isVisible: false, data: undefined})
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
      format: {
        type: 'currency'
      }
    },
    {
      header: 'Fecha Creación',
      field: 'fechaHoraAct',
      format: {
        type: 'date',
        params: 'yyyy-MM-dd'
      }
    }
  ]

  ngOnInit(): void {
    this._productService.getListProducts().subscribe({
      next: (res) => {
        this.products.set(res.data ?? [])
      }
    })
  }

  accionEvent(data: IAccionOutput<IProduct>){
    switch (data.type) {
      case 'editable':
        this.modalProduct.set({
          isVisible: true,
          data: data.data
        })
        break;
      case 'delete':
        break
    }
  }

}
