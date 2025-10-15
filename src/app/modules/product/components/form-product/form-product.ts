import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IProduct } from '../../interfaces/IProduct.interface';
import { IFormProduct } from '../../interfaces/IFormProduct.interface';
import { Select } from 'primeng/select';
import { CategoryService } from '../../../category/services/category.service';
import { ICategory } from '../../../category/interfaces/ICategory.interface';

@Component({
  selector: 'app-form-product',
  imports: [ReactiveFormsModule, InputTextModule, Select],
  templateUrl: './form-product.html',
  styleUrl: './form-product.scss'
})
export class FormProduct implements OnInit {

  @Input() product?: IProduct

  private readonly _fb = inject(FormBuilder)
  private readonly _categoryService = inject(CategoryService)
  private readonly _formProduct: FormGroup

  public categories = signal<ICategory[]>([])



  constructor(){
    this._formProduct = this.createFormProducto();

  }
  ngOnInit(): void {
    if(this.product){
      this._formProduct.patchValue(this.setFormProductValues(this.product))
    }
    this._categoryService.getListCategory().subscribe({
      next: (categoryList) => {
        this.categories.set(categoryList.data ?? [])
      }
    })
  }


  setFormProductValues(value: IProduct): IFormProduct{
    return {
      prodDescription: value.prodDescripcion,
      prodUltPrice:  value.prodUltPrecio,
      categoryId: value.categoriaId,
      brandId: value.marcaId,
      companyId: value.empresaId,
      supplierId: value.proveedorId
    }
  }

  createFormProducto(){
    return this._fb.group({
      prodDescription: ['', [Validators.required]],
      prodUltPrice: [0, [Validators.required]],
      categoryId: [0, [Validators.required]],
      companyId: [ 0, [Validators.required]],
      supplierId: [ 0, [Validators.required]],
      brandId: [0, [Validators.required]]
    })
  }

  get formProduct(){
    return this._formProduct
  }

}
