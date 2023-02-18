import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInvoiceScheduleRefComponent } from './update-invoice-schedule-ref.component';

describe('UpdateInvoiceScheduleRefComponent', () => {
  let component: UpdateInvoiceScheduleRefComponent;
  let fixture: ComponentFixture<UpdateInvoiceScheduleRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInvoiceScheduleRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInvoiceScheduleRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
