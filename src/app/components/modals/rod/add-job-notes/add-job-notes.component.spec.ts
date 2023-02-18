import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobNotesComponent } from './add-job-notes.component';

describe('AddJobNotesComponent', () => {
  let component: AddJobNotesComponent;
  let fixture: ComponentFixture<AddJobNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
