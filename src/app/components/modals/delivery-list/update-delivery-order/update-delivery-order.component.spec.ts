import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeliveryOrderComponent } from './update-delivery-order.component';

describe('UpdateDeliveryOrderComponent', () => {
  let component: UpdateDeliveryOrderComponent;
  let fixture: ComponentFixture<UpdateDeliveryOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDeliveryOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeliveryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
