import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfirmPay } from './form-confirm-pay';

describe('FormConfirmPay', () => {
  let component: FormConfirmPay;
  let fixture: ComponentFixture<FormConfirmPay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConfirmPay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConfirmPay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
