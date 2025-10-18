import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableModule } from 'primeng/table';
import { IAccionOutput, IColumn, IFooter, typeAccionOutput, typeOperation } from '../../interfaces/ICustomTable.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-custom-table',
  imports: [TableModule, CurrencyPipe, DatePipe, ButtonModule],
  templateUrl: './custom-table.html',
  styleUrl: './custom-table.scss'
})
export class CustomTable<T extends Record<string, any>> {

  @Input({required: true}) data: T[] = []
  @Input({required: true}) columns: IColumn[]  = []
  @Input() colFooter?: IFooter[]

  @Input() editable: boolean = false;
  @Input() delete: boolean = false

  @Output() onAccionEmit: EventEmitter<IAccionOutput<T>> = new EventEmitter<IAccionOutput<T>>();

  onAccionEvent(accion: typeAccionOutput, data: T){
    this.onAccionEmit.emit({
      type: accion,
      data
    })
  }


  operationY(operation?: typeOperation, campo?: string){
    switch (operation) {
      case 'sum':
        return this.sumFiedlsY(campo);

      default:
        return 0
    }
  }

  sumFiedlsY(campo?: string){
    if(!campo)  return 0;
    let total = 0;
    for (const element of this.data) {
      if(typeof(element[campo]) == 'number'){
        total += element[campo]
      }

    }
    return total
  }

  operationX(idElement: number, field: string ,args?: string[], operation?: typeOperation,){
    switch (operation) {
      case 'sum':
        return 0;
      case 'multiply':
        return this.multiplayX(idElement, field, args);
      case 'iva':
        return this.multiplayX(idElement, field, args) * 0.15;

      default:
        return 0
    }
  }

  multiplayX(idElement: number, field?: string ,args?: string[]){
    const value = this.data.find( i => i[field ?? ''] == idElement )
    if(!value) return 0
    let total = 0;
    args?.forEach( key => {
      if(typeof(value[key] == 'number')){
        if(total == 0){
          total = value[key]
        } else {
          total = total * value[key]
        }
      }
    })
    return total
  }



}
