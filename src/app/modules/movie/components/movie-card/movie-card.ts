import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IMovie } from '../../interfaces/IMovieNowPlaying.interface';
import { environments } from '../../../../environments/environments';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard implements OnInit, AfterViewInit{

  @ViewChild('movieCard') movieCard?: ElementRef<HTMLDivElement>

  @Input({ required: true}) movie!: IMovie

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    if(this.movieCard){
      this.movieCard.nativeElement.style.backgroundImage = `url("${environments.baseUrlTMDB_IMAGE}${this.movie.poster_path}")`;
      this.movieCard.nativeElement.style.backgroundSize = 'cover'
      this.movieCard.nativeElement.style.setProperty('--text-card-movie', `'${this.movie.title}`)
    }
  }
}
