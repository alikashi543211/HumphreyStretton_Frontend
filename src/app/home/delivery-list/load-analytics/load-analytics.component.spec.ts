import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAnalyticsComponent } from './load-analytics.component';

describe('LoadAnalyticsComponent', () => {
  let component: LoadAnalyticsComponent;
  let fixture: ComponentFixture<LoadAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
