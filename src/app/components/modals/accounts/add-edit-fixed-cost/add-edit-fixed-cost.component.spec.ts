import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFixedCostComponent } from './add-edit-fixed-cost.component';

describe('AddEditFixedCostComponent', () => {
  let component: AddEditFixedCostComponent;
  let fixture: ComponentFixture<AddEditFixedCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFixedCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFixedCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
