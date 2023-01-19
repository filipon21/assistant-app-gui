import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitPrescriptionUploadComponent } from './visit-prescription-upload.component';

describe('VisitPrescriptionUploadComponent', () => {
  let component: VisitPrescriptionUploadComponent;
  let fixture: ComponentFixture<VisitPrescriptionUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitPrescriptionUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitPrescriptionUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
