import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateSalesOrderComponent } from './calculate-sales-order.component';

describe('CalculateSalesOrderComponent', () => {
  let component: CalculateSalesOrderComponent;
  let fixture: ComponentFixture<CalculateSalesOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateSalesOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
