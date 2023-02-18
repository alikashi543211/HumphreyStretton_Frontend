import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkingComponent } from './walking.component';

describe('WalkingComponent', () => {
  let component: WalkingComponent;
  let fixture: ComponentFixture<WalkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
