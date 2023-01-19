import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerVisitAppointmentDialogComponent } from './worker-visit-appointment-dialog.component';

describe('WorkerVisitAppointmentDialogComponent', () => {
  let component: WorkerVisitAppointmentDialogComponent;
  let fixture: ComponentFixture<WorkerVisitAppointmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerVisitAppointmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerVisitAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
