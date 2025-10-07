import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { URL_ROUTES } from '../../../shared/const/url-routes';
import { IMovieDetail } from '../../interfaces/IMovieDetail.interface';
import { environments } from '../../../../environments/environments';
import { Chip } from 'primeng/chip';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CustomCarousel } from '../../../shared/components/custom-carousel/custom-carousel';
import { IMovieSimilar } from '../../interfaces/ISimilar.interface';

@Component({
  selector: 'app-movie-detail',
  imports: [Chip, DatePipe, DecimalPipe, CustomCarousel],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss'
})
export class MovieDetail implements OnInit {

  private readonly _router = inject(ActivatedRoute);
  private readonly _route = inject(Router);
  private readonly _movieService = inject(MovieService);

  public movie = signal<IMovieDetail>({} as IMovieDetail)
  public moviesSimilar = signal<IMovieSimilar[]>([])

  public responsiveOptionsMoviesSimilar = [
        {
          breakpoint: '1400px',
          numVisible: 5,
          numScroll: 1,
        },
        {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1,
        },
        {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1,
        },
        {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1,
        },
      ]

  ngOnInit(){
    const idMovie = this._router.snapshot.paramMap.get('id')
    const onlyNumers: RegExp = /^[0-9]*$/
    if(!idMovie || !onlyNumers.test(idMovie)) {
      this._route.navigateByUrl(URL_ROUTES.MOVIE+'/error')
      return
    }
    this._movieService.getMovieDetail(Number(idMovie)).subscribe({
      next: (movieDetail) => {
        this.movie?.set(movieDetail)
        this._movieService.getSimilar(Number(idMovie)).subscribe({
          next: ( moviesSimilar ) => {
            this.moviesSimilar.set(moviesSimilar.results)
          }
        })
      }
    })
  }

  get baseUrlImage() {
    return environments.baseUrlTMDB_Images+'/original'
  }
}
