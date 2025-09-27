import { Component, Input } from '@angular/core';
import { IColumn } from '../../interfaces/ITabla.interface';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [TableModule, CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table<T> {

  @Input({required: true}) data: T[] = []

  @Input({required: true}) columns: IColumn[] = []

  @Input() showGridLines?: boolean = false

  rowClass(column: IColumn) {
    let styles = ''
    if(column.position){
      switch (column.position) {
        case 'center':
          styles += 'tw:text-center';
          break;
        case 'left':
          styles += 'tw:text-left';
          break;
        case 'right':
          styles += 'tw:text-right';
          break;
      }
    }
    return styles
  }
  rowStyles(column: IColumn) {
    let styles = {
      'text-align': 'center !important'
    }

    return styles
  }

}
