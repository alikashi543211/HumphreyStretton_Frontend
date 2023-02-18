import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAccountSalesOrderComponent } from './add-edit-account-sales-order.component';

describe('AddEditAccountSalesOrderComponent', () => {
  let component: AddEditAccountSalesOrderComponent;
  let fixture: ComponentFixture<AddEditAccountSalesOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAccountSalesOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAccountSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
