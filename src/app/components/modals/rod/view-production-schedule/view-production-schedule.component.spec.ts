import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductionScheduleComponent } from './view-production-schedule.component';

describe('ViewProductionScheduleComponent', () => {
  let component: ViewProductionScheduleComponent;
  let fixture: ComponentFixture<ViewProductionScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductionScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductionScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
