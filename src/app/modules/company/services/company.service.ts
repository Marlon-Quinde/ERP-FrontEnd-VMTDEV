import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../shared/interfaces/IApiResponse.interface';
import { ICompany } from '../interfaces/ICompany.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly _baseUrl: string = environments.baseUrl;

  private readonly _http = inject(HttpClient)

  constructor() { }

  getListCompany(): Observable<IApiResponse<ICompany[]>>{
    const url: string = `${this._baseUrl}/Company/listar`;
    return this._http.get<IApiResponse<ICompany[]>>(url);
  }

}
