import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/IProduct.interface';
import { CustomTable } from '../../../shared/components/custom-table/custom-table';
import { IAccionOutput, IColumn } from '../../../shared/interfaces/ICustomTable.interface';
import { ModalProduct } from '../../components/modal-product/modal-product';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-list-products',
  imports: [CustomTable, ButtonModule],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
  providers: [DialogService],
})
export class ListProducts implements OnInit {
  private readonly _productService = inject(ProductService);
  private readonly _dialog = inject(DialogService);

  public products = signal<IProduct[]>([]);
  public ref: DynamicDialogRef<ModalProduct> | undefined;

  public modalProduct = signal<{ isVisible: boolean; data?: IProduct }>({
    isVisible: false,
    data: undefined,
  });
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
      header: 'Precio',
      field: 'prodUltPrecio',
      format: {
        type: 'currency',
      },
    },
    {
      header: 'Fecha Creación',
      field: 'fechaHoraAct',
      format: {
        type: 'date',
        params: 'yyyy-MM-dd',
      },
    },
  ];

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this._productService.getListProducts().subscribe({
      next: (res) => {
        this.products.set(res.data ?? []);
      },
    });
  }

  accionEvent(data: IAccionOutput<IProduct>) {
    switch (data.type) {
      case 'editable':
        this.openModalProduct(data.data);
        break;
      case 'delete':
        break;
    }
  }

  createProduct() {
    this.openModalProduct();
  }

  openModalProduct(data?: IProduct) {
    this.ref = this._dialog.open(ModalProduct, {
      data,
      focusOnShow: false,
      header: data ? 'Editar producti' : 'Nuevo producto',
      maximizable: true,
      contentStyle: { overflow: 'auto' },
      modal: true,
      closable: true,
    });

    this.ref.onClose.subscribe(() => {
      this.listProducts();
    });
  }
}
