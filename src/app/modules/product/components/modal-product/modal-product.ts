import { Component, Input, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { IProduct } from '../../interfaces/IProduct.interface';
import { FormProduct } from '../form-product/form-product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-product',
  imports: [Dialog, ButtonModule, FormProduct, CommonModule],
  templateUrl: './modal-product.html',
  styleUrl: './modal-product.scss'
})
export class ModalProduct {
  @Input() visible: boolean = false;
  @Input() isOpen = signal<{ isVisible: boolean, data?: IProduct }>({isVisible: false, data: undefined});




}
