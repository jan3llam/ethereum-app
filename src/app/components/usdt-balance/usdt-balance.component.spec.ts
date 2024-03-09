import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsdtBalanceComponent } from './usdt-balance.component';

describe('UsdtBalanceComponent', () => {
  let component: UsdtBalanceComponent;
  let fixture: ComponentFixture<UsdtBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsdtBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsdtBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
