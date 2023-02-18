import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkOrderComponent } from './edit-work-order.component';

describe('AddWorkOrderComponent', () => {
  let component: EditWorkOrderComponent;
  let fixture: ComponentFixture<EditWorkOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
