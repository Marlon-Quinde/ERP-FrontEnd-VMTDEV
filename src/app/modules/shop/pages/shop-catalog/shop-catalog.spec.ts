import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCatalog } from './shop-catalog';

describe('ShopCatalog', () => {
  let component: ShopCatalog;
  let fixture: ComponentFixture<ShopCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCatalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
