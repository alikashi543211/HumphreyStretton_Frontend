import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDeliveredConfirmationComponent } from './status-delivered-confirmation.component';

describe('StatusDeliveredConfirmationComponent', () => {
  let component: StatusDeliveredConfirmationComponent;
  let fixture: ComponentFixture<StatusDeliveredConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusDeliveredConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDeliveredConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
