import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredWarningComponent } from './delivered-warning.component';

describe('DeliveredWarningComponent', () => {
  let component: DeliveredWarningComponent;
  let fixture: ComponentFixture<DeliveredWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveredWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveredWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
