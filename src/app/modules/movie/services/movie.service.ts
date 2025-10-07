import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { INowPlaying } from '../interfaces/INowPlaying.interface';
import { Observable } from 'rxjs';
import { IMovieDetail } from '../interfaces/IMovieDetail.interface';
import { ISimilar } from '../interfaces/ISimilar.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly _http = inject(HttpClient);
  private readonly _baseUrl: string = environments.baseUrlTMDB

  getMoviesNowPlaying(): Observable<INowPlaying>{
    const url: string = `${this._baseUrl}/3/movie/now_playing`
    return this._http.get<INowPlaying>(url)
  }

  getMovieDetail(idMovie: number): Observable<IMovieDetail>{
    const url: string = `${this._baseUrl}/3/movie/${idMovie}`
    return this._http.get<IMovieDetail>(url)
  }

  getSimilar(idMovie: number): Observable<ISimilar> {
    const url: string = `${this._baseUrl}/3/movie/${idMovie}/similar`
    return this._http.get<ISimilar>(url)
  }

}
