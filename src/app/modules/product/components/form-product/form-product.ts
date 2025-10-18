import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Loader } from '../../../shared/components/loader/loader';

import { IBrand } from '../../../brand/interfaces/IBrand.interface';
import { ICategory } from '../../../category/interfaces/ICategory.interface';
import { ICompany } from '../../../company/interfaces/ICompany.interface';
import { IFormProduct } from '../../interfaces/IFormProduct.interface';
import { IProduct } from '../../interfaces/IProduct.interface';
import { ISupplier } from '../../../supplier/interfaces/ISupplier.interface';

import { BrandService } from '../../../brand/services/brand.service';
import { CategoryService } from '../../../category/services/category.service';
import { CompanyService } from '../../../company/services/company.service';
import { SupplierService } from '../../../supplier/services/supplier.service';

import { ButtonModule } from 'primeng/button';
import { Fluid } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { Select } from 'primeng/select';
import { SharedService } from '../../../shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { IUpdateProduct } from '../../interfaces/IUpdateProduct.interface';
import { ProductService } from '../../services/product.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OnlyNumbersDirective } from '../../../shared/directives/onlyNumbers.directive';

@Component({
  selector: 'app-form-product',
  imports: [
    ButtonModule,
    Fluid,
    InputTextModule,
    InputNumber,
    KeyFilterModule,
    Loader,
    ReactiveFormsModule,
    Select
  ],
  templateUrl: './form-product.html',
  styleUrl: './form-product.scss',
})
export class FormProduct implements OnInit {
  @Input() product?: IProduct;

  private readonly _fb = inject(FormBuilder);
  private readonly _companyService = inject(CompanyService);
  private readonly _categoryService = inject(CategoryService);
  private readonly _supplierService = inject(SupplierService);
  private readonly _brandService = inject(BrandService);
  private readonly _sharedService = inject(SharedService);
  private readonly _toastr = inject(ToastrService);
  private readonly _productService = inject(ProductService);

  private _dialog = inject(DynamicDialogRef)

  private readonly _formProduct: FormGroup;

  public categories = signal<ICategory[]>([]);
  public companies = signal<ICompany[]>([]);
  public suppliers = signal<ISupplier[]>([]);
  public brands = signal<IBrand[]>([]);

  constructor() {
    this._formProduct = this.createFormProducto();
  }
  ngOnInit(): void {
    if (this.product) {
      this._formProduct.patchValue(this.setFormProductValues(this.product));
    }
    this._categoryService.getListCategory().subscribe({
      next: (listCategory) => {
        this.categories.set(listCategory.data ?? []);
      },
    });
    this._companyService.getListCompany().subscribe({
      next: (listCompany) => {
        this.companies.set(listCompany.data ?? []);
      },
    });
    this._supplierService.getListSupplier().subscribe({
      next: (listSupplier) => {
        this.suppliers.set(listSupplier.data ?? []);
      },
    });
    this._brandService.getListBrand().subscribe({
      next: (listBrand) => {
        this.brands.set(listBrand.data ?? []);
      },
    });
  }

  setFormProductValues(value: IProduct): IFormProduct {
    return {
      prodDescription: value.prodDescripcion,
      prodUltPrice: value.prodUltPrecio,
      categoryId: value.categoriaId,
      brandId: value.marcaId,
      companyId: value.empresaId,
      supplierId: value.proveedorId,
    };
  }

  createFormProducto() {
    return this._fb.group({
      prodDescription: ['', [Validators.required]],
      prodUltPrice: [0, [Validators.required]],
      categoryId: [0, [Validators.required]],
      companyId: [0, [Validators.required]],
      supplierId: [0, [Validators.required]],
      brandId: [0, [Validators.required]],
    });
  }

  get formProduct() {
    return this._formProduct;
  }

  get alphaNumericSpace() {
    return this._sharedService.alphaNumericSpace;
  }

  saveProduct() {
    if (this.formProduct.invalid) {
      this._toastr.warning('Complete todos los campos', 'Formulario inválido');
      return;
    }
    const valueForm = this._formProduct.value as IFormProduct;

    if (valueForm.prodUltPrice <= 0) {
      this._toastr.warning('El precio no puede ser menor o igual a cero', 'Campo inválido');
      return;
    }
    const payload: IUpdateProduct = valueForm;

    if (this.product) {
      this._productService
        .putUpdateProduct(this.product.prodId.toString(), payload)
        .subscribe({
          next: (res) => {
            this._dialog.close(res)
          }
        });
    } else {
      this._productService
        .postCreateProduct(payload).subscribe({
          next: (res) => {
            this._dialog.close(res)
          }
        })
    }
  }

  onClose(){
    this._dialog.close()
  }
}
