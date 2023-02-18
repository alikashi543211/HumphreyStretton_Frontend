import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleJobNotesComponent } from './add-multiple-job-notes.component';

describe('AddMultipleJobNotesComponent', () => {
  let component: AddMultipleJobNotesComponent;
  let fixture: ComponentFixture<AddMultipleJobNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultipleJobNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultipleJobNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
