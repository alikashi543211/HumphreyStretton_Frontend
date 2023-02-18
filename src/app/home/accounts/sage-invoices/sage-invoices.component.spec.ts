import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SageInvoicesComponent } from './sage-invoices.component';

describe('SageInvoicesComponent', () => {
  let component: SageInvoicesComponent;
  let fixture: ComponentFixture<SageInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SageInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SageInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
