import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { IApiResponse } from '../../shared/interfaces/IApiResponse.interface';
import { IBrand } from '../interfaces/IBrand.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private readonly _baseUrl: string = environments.baseUrl;
  private readonly _http = inject(HttpClient)

  constructor() { }

  getListBrand(): Observable<IApiResponse<IBrand[]>>{
    const url: string = `${this._baseUrl}/Brand/Listar-Marca`;
    return this._http.get<IApiResponse<IBrand[]>>(url)
  }

}
