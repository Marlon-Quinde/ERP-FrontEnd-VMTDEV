import { Component, Input } from '@angular/core';

import { TableModule } from 'primeng/table';
import { IColumn } from '../../interfaces/ICustomTable.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-custom-table',
  imports: [TableModule, CurrencyPipe, DatePipe],
  templateUrl: './custom-table.html',
  styleUrl: './custom-table.scss'
})
export class CustomTable<T> {

  @Input({required: true}) data: T[] = []

  @Input({required: true}) columns: IColumn[]  = []

}
