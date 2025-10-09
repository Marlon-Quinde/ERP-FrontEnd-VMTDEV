import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { IApiResponse } from '../../shared/interfaces/IApiResponse.interface';
import { IProduct } from '../interfaces/IProduct.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _http = inject(HttpClient)
  private readonly _baseUrl: string = environments.baseUrl;

  constructor() { }

  getListProducts(): Observable<IApiResponse<IProduct[]>>{
    const url: string = `${this._baseUrl}/Product/Listar-Productos`;
    return this._http.get<IApiResponse<IProduct[]>>(url)
  }

}
