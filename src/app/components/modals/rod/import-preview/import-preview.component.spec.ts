import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPreviewComponent } from './import-preview.component';

describe('AddJobNotesComponent', () => {
  let component: ImportPreviewComponent;
  let fixture: ComponentFixture<ImportPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
