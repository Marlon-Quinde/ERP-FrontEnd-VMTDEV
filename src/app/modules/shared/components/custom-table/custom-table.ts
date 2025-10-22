import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableModule } from 'primeng/table';
import {
  IAccionOutput,
  IColumn,
  IFooter,
  IOperation,
  IValues,
  typeAccionOutput,
  typeOperation,
  typeOperationMultiple,
} from '../../interfaces/ICustomTable.interface';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { environments } from '../../../../environments/environments';

@Component({
  selector: 'app-custom-table',
  imports: [TableModule, CurrencyPipe, DatePipe, ButtonModule, CommonModule],
  templateUrl: './custom-table.html',
  styleUrl: './custom-table.scss',
})
export class CustomTable<T extends Record<string, any>> {
  @Input({ required: true }) data: T[] = [];
  @Input({ required: true }) columns: IColumn[] = [];
  @Input() colFooter?: IFooter[];

  @Input() editable: boolean = false;
  @Input() delete: boolean = false;
  @Input() showGridlines?: boolean = false;

  @Output() onAccionEmit: EventEmitter<IAccionOutput<T>> = new EventEmitter<IAccionOutput<T>>();

  public values: IValues[] = [];

  onAccionEvent(accion: typeAccionOutput, data: T) {
    this.onAccionEmit.emit({
      type: accion,
      data,
    });
  }

  operationY(operation: IOperation) {
    switch (operation.typeOperate) {
      case 'sum':
        return this.sumFiedlsY(operation.field);
      case 'multipleOperation':
        return this.operateMultipleXY(operation);
      default:
        return 0;
    }
  }

  sumFiedlsY(campo?: string) {
    if (!campo) return 0;
    let total = 0;
    for (const element of this.data) {
      if (typeof element[campo] == 'number') {
        total += element[campo];
      }
    }
    return total;
  }

  operationX(idElement: number, operation?: IOperation) {
    switch (operation?.typeOperate) {
      case 'sum':
        return 0;
      case 'multiply':
        return this.multiplayX(idElement, operation.field, operation.columns as string[]);
      case 'iva':
        return this.multiplayX(idElement, operation.field, operation.columns as string[]) * environments.IVA;

      default:
        return 0;
    }
  }

  multiplayX(idElement: number, field?: string, args?: string[]) {
    const value = this.data.find((i) => i[field ?? ''] == idElement);
    if (!value) return 0;
    let total = 0;
    args?.forEach((key) => {
      if (typeof (value[key] == 'number')) {
        if (total == 0) {
          total = value[key];
        } else {
          total = total * value[key];
        }
      }
    });
    return total;
  }

  operateMultipleXY(operation: IOperation) {
    let total: number = 0;
    let values: IValues[] = [];
    let nextOperation: string | null;
    this.data.forEach((element, index) => {
      const tag = `${index}-${operation.columns?.join()}`;
      operation.columns?.forEach((key) => {
        switch (key) {
          case '*':
          case '+':
          case '-':
          case '/':
            nextOperation = key;
            break;
          default:
            if (!nextOperation && !values.length) {
              values.push({
                tag,
                value: element[key],
              });
              break;
            }

            if (values.find( i => i.tag == tag)) {

              values.forEach((value) => {
                if (value.tag == tag) {
                  const operateValue = typeof(key) == 'number' ? key : element[key]
                  switch (nextOperation) {
                    case '*':

                      value.value = value.value * operateValue;
                      break;
                    case '+':
                      value.value = value.value + operateValue;
                      break;
                    case '-':
                      value.value = value.value - operateValue;
                      break;
                    case '/':
                      value.value = value.value / operateValue;
                      break;
                  }
                  nextOperation = null
                }
              });
            } else {
              values.push({
                tag,
                value: element[key],
              });
              break;
            }

            break;
        }
      });
    });

    if(values.length){
      values.forEach(element => {
        total += element.value
      });
    }

    return total;
  }
}
