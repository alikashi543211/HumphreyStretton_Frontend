import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPurchaseOrderSummaryComponent } from './show-purchase-order-summary.component';

describe('ShowPurchaseOrderSummaryComponent', () => {
  let component: ShowPurchaseOrderSummaryComponent;
  let fixture: ComponentFixture<ShowPurchaseOrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPurchaseOrderSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPurchaseOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
