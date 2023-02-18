import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreditCheckDetailsComponent } from './view-credit-check-details.component';

describe('ViewCreditCheckDetailsComponent', () => {
  let component: ViewCreditCheckDetailsComponent;
  let fixture: ComponentFixture<ViewCreditCheckDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCreditCheckDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCreditCheckDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
