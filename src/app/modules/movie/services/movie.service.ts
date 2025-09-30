import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly _http = inject(HttpClient);
  private readonly _baseUrl: string = environments.baseUrlTMDB
  private readonly _apiKey: string = environments.apiKeyTMDB

  getMoviesNowPlaying(){
    const url: string = `${this._baseUrl}/3/movie/now_playing`

    return this._http.get(url, {
      headers: {
        "Authorization": `Bearer ${this._apiKey}`
      },
      params: {
        language: 'es-ES'
      }
    })
  }

}
