import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAccountPurchaseOrderComponent } from './add-edit-account-purchase-order.component';

describe('AddEditAccountPurchaseOrderComponent', () => {
  let component: AddEditAccountPurchaseOrderComponent;
  let fixture: ComponentFixture<AddEditAccountPurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAccountPurchaseOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAccountPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
