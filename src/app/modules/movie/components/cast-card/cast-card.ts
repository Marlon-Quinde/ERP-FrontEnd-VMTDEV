import { Component, Input } from '@angular/core';
import { Cast } from '../../interfaces/ICredits.interface';
import { environments } from '../../../../environments/environments';

@Component({
  selector: 'app-cast-card',
  imports: [],
  templateUrl: './cast-card.html',
  styleUrl: './cast-card.scss'
})
export class CastCard {

  @Input({ required: true }) cast!: Cast

  get baseUrl(){
    return environments.baseUrlTMDB_Images+'/w500'
  }
}
