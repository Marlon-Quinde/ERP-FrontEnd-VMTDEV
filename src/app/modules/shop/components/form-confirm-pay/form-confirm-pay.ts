import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-confirm-pay',
  imports: [ReactiveFormsModule],
  templateUrl: './form-confirm-pay.html',
  styleUrl: './form-confirm-pay.scss'
})
export class FormConfirmPay {

  private readonly _fb = inject(FormBuilder)

  createFormMovimentCab() {
    return this._fb.group({
      movicabId: [0, [Validators.required]],
      typeMovId: [0, [Validators.required]],
      typeMovIngEgr: [0, [Validators.required]],
      companyId: [0, [Validators.required]],
      branchId: [0, [Validators.required]],
      warehouseId: [0, [Validators.required]],
    });
  }

}
