import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-title',
  imports: [],
  templateUrl: './custom-title.html',
  styleUrl: './custom-title.scss'
})
export class CustomTitle {
  @Input({ required: true}) title!: string
  @Input() subTitle?: string
}
