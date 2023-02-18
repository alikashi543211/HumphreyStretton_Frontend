import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSalesOrderComponent } from './add-edit-sales-order.component';

describe('AddEditSalesOrderComponent', () => {
  let component: AddEditSalesOrderComponent;
  let fixture: ComponentFixture<AddEditSalesOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSalesOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
