import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../shared/interfaces/IApiResponse.interface';
import { ICategory } from '../interfaces/ICategory.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly _http = inject(HttpClient)
  private readonly _baseUrl: string = environments.baseUrl;

  constructor() { }

   // ? Categoria
  getListCategory(): Observable<IApiResponse<ICategory[]>> {
    const url: string = `${this._baseUrl}/Category/Listar-Categorìa`;
    return this._http.get<IApiResponse<ICategory[]>>(url)
  }


}
