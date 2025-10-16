import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { IApiResponse } from '../../shared/interfaces/IApiResponse.interface';
import { IProduct } from '../interfaces/IProduct.interface';
import { Observable } from 'rxjs';
import { IUpdateProduct } from '../interfaces/IUpdateProduct.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _http = inject(HttpClient)
  private readonly _baseUrl: string = environments.baseUrl;

  constructor() { }

  // ? Productos
  getListProducts(): Observable<IApiResponse<IProduct[]>>{
    const url: string = `${this._baseUrl}/Product/Listar-Productos`;
    return this._http.get<IApiResponse<IProduct[]>>(url)
  }

  putUpdateProduct(id: string, payload: IUpdateProduct){
    const url: string = `${this._baseUrl}/Product/Actualizar-Productos`
    const body = { ...payload }
    return this._http.put(url, body, {
      params: {
        id
      }
    })
  }


}
