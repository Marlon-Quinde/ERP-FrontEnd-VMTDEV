import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-now-playing',
  imports: [],
  templateUrl: './now-playing.html',
  styleUrl: './now-playing.scss'
})
export class NowPlaying implements OnInit {

  private readonly _movieServices = inject(MovieService)

  ngOnInit(): void {
    this._movieServices
    .getMoviesNowPlaying()
    .subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }
}
