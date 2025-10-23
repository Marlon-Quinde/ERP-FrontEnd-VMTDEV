import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPay } from './confirm-pay';

describe('ConfirmPay', () => {
  let component: ConfirmPay;
  let fixture: ComponentFixture<ConfirmPay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
