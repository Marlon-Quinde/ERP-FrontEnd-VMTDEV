import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { IMoviesNowPlaying } from '../interfaces/IMovieNowPlaying.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly _http = inject(HttpClient);
  private readonly _baseUrl: string = environments.baseUrlTMDB

  getMoviesNowPlaying(): Observable<IMoviesNowPlaying>{
    const url: string = `${this._baseUrl}/3/movie/now_playing`
    return this._http.get<IMoviesNowPlaying>(url)
  }

}
