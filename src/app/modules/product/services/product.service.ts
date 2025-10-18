import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { IApiResponse } from '../../shared/interfaces/IApiResponse.interface';
import { IProduct } from '../interfaces/IProduct.interface';
import { Observable } from 'rxjs';
import { IUpdateProduct } from '../interfaces/IUpdateProduct.interface';
import { ICreateProduct } from '../interfaces/ICreateProduct.interface';

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

  putUpdateProduct(id: string, payload: IUpdateProduct): Observable<IApiResponse<boolean>>{
    const url: string = `${this._baseUrl}/Product/Actualizar-Productos`
    const body = { ...payload }
    return this._http.put<IApiResponse<boolean>>(url, body, {
      params: {
        id
      }
    })
  }

  postCreateProduct(payload: ICreateProduct): Observable<IApiResponse<string>>{
    const url: string = `${this._baseUrl}/Product/Crear-Productos`
    const body = { ...payload }
    return this._http.post<IApiResponse<string>>(url, body )
  }

  deleteProduct(id: string): Observable<IApiResponse<boolean>> {
    const url: string = `${this._baseUrl}/Product/${id}`
    return this._http.delete<IApiResponse<boolean>>(url)
  }


}
