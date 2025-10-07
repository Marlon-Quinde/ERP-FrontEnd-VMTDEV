import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { IMovieNowPlaying } from '../../interfaces/INowPlaying.interface';
import { environments } from '../../../../environments/environments';
import { Router, RouterLink } from '@angular/router';
import { URL_ROUTES } from '../../../shared/const/url-routes';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard implements AfterViewInit{

  @ViewChild('movieCard') movieCard?: ElementRef<HTMLDivElement>

  @Input({ required: true}) movie!: IMovieNowPlaying
  @Input() masInfo?: boolean = false

  private readonly _router = inject(Router)

  ngAfterViewInit(){
    if(this.movieCard){
      this.movieCard.nativeElement.style.backgroundImage = `url("${environments.baseUrlTMDB_Images}/w500${this.movie.poster_path}")`;
      this.movieCard.nativeElement.style.backgroundSize = 'cover'
      this.movieCard.nativeElement.style.setProperty('--text-card-movie', `'${this.movie.title}`)
    }
  }

  get baseUrl(){
    return URL_ROUTES.DETAIL
  }

  onClick(){
    if(this.masInfo) return;
    this._router.navigate([URL_ROUTES.DETAIL, this.movie.id])
    setTimeout(() => {
      location.reload();
    }, 300);
  }
}
