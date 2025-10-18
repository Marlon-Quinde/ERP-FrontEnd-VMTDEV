import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/IProduct.interface';
import { CustomTable } from '../../../shared/components/custom-table/custom-table';
import { IAccionOutput, IColumn } from '../../../shared/interfaces/ICustomTable.interface';
import { ModalProduct } from '../../components/modal-product/modal-product';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { IApiResponse } from '../../../shared/interfaces/IApiResponse.interface';
import { CustomTitle } from '../../../shared/components/custom-title/custom-title';
@Component({
  selector: 'app-list-products',
  imports: [CustomTable, ButtonModule, ConfirmDialog, CustomTitle],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
  providers: [DialogService, ConfirmationService],
})
export class ListProducts implements OnInit {
  private readonly _productService = inject(ProductService);
  private readonly _dialog = inject(DialogService);
  private readonly _confirmationService = inject(ConfirmationService);
  private readonly _toastr = inject(ToastrService);

  public products = signal<IProduct[]>([]);
  public ref: DynamicDialogRef<ModalProduct> | undefined;

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
        this.openModalProduct(data.data).onClose.subscribe((res: IApiResponse<boolean>) => {
          this._toastr.info(res.message, 'Transacción Exítosa');
          this.listProducts();
        });
        break;
      case 'delete':
        this._confirmationService.confirm({
          message: `Desee borrar el elemento seleccionado "${data.data.prodDescripcion}"? `,
          header: 'Esta seguro?',
          closable: true,
          closeOnEscape: true,
          icon: 'pi pi-exclamation-triangle',
          rejectButtonProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true,
          },
          acceptButtonProps: {
            label: 'Eliminar',
            severity: 'danger',
          },
          accept: () => {
            this._productService.deleteProduct(data.data.prodId.toString()).subscribe({
              next: (res) => {
                this._toastr.info(res.message, 'Transacción Exítosa');
                this.listProducts();
              },
            });
          },
        });
        break;
    }
  }

  createProduct() {
    this.openModalProduct().onClose.subscribe((res: IApiResponse<string>) => {
      this._toastr.info(res.message, 'Transacción Exítosa');
      this.listProducts();
    });
  }

  openModalProduct(data?: IProduct) {
    return this._dialog.open(ModalProduct, {
      data,
      focusOnShow: false,
      header: data ? 'Editar producto' : 'Nuevo producto',
      maximizable: true,
      height: '90vh',
      contentStyle: { overflow: 'none', height: '100%' },
      modal: true,
      closable: true,
    });
  }
}
