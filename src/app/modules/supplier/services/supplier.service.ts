import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { IApiResponse } from '../../shared/interfaces/IApiResponse.interface';
import { ISupplier } from '../interfaces/ISupplier.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private readonly _baseUrl: string = environments.baseUrl;
  private readonly _http = inject(HttpClient);

  constructor() {}

  getListSupplier(): Observable<IApiResponse<ISupplier[]>> {
    const url: string = `${this._baseUrl}/Supplier/listar-proveedor`;
    return this._http.get<IApiResponse<ISupplier[]>>(url);
  }
}
