import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableModule } from 'primeng/table';
import {
  IAccionOutput,
  IColumn,
  IFooter,
  IOperation,
  IValues,
  typeAccionOutput,
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


  onAccionEvent(accion: typeAccionOutput, data: T) {
    this.onAccionEmit.emit({
      type: accion,
      data,
    });
  }


  operationX(element: T, operation: IOperation) {
    let total = 0;
    let nextOperation: string | null;
    operation.columns?.forEach((key) => {
      switch (key) {
        case '*':
        case '+':
        case '-':
        case '/':
          nextOperation = key;
          break;
        default:
          if (!nextOperation) {
            total = typeof key == 'number' ? key : element[key];
            break;
          }
          const operateValue = typeof key == 'number' ? key : element[key];

          switch (nextOperation) {
            case '*':
              total = total * operateValue;
              break;
            case '+':
              total = total + operateValue;
              break;
            case '-':
              total = total - operateValue;
              break;
            case '/':
              total = total / operateValue;
              break;
          }
          nextOperation = null;
          break;
      }
    });
    return total;
  }

  operationY(operation: IOperation) {
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
                value: typeof key == 'number' ? key : element[key],
              });
              break;
            }

            if (values.find((i) => i.tag == tag)) {
              values.forEach((value) => {
                if (value.tag == tag) {
                  const operateValue = typeof key == 'number' ? key : element[key];
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
                  nextOperation = null;
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

    if (values.length) {
      values.forEach((element) => {
        total += element.value;
      });
    }

    return total;
  }
}
