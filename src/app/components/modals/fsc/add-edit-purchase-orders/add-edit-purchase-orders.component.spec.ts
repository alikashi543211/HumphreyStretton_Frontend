import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPurchaseOrdersComponent } from './add-edit-purchase-orders.component';

describe('AddEditPurchaseOrdersComponent', () => {
  let component: AddEditPurchaseOrdersComponent;
  let fixture: ComponentFixture<AddEditPurchaseOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPurchaseOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPurchaseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
