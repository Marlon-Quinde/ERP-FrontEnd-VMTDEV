import { Component, Input, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IAccionOutput } from '../../../shared/interfaces/ICustomTable.interface';
import { IProduct } from '../../interfaces/IProduct.interface';

@Component({
  selector: 'app-modal-product',
  imports: [Dialog, ButtonModule, InputTextModule],
  templateUrl: './modal-product.html',
  styleUrl: './modal-product.scss'
})
export class ModalProduct {
  @Input() visible: boolean = false;
  @Input() isOpen = signal<{ isVisible: boolean, data?: IProduct }>({isVisible: false, data: undefined});




}
