import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerVisitAppointmentComponent } from './worker-visit-appointment.component';

describe('WorkerVisitAppointmentComponent', () => {
  let component: WorkerVisitAppointmentComponent;
  let fixture: ComponentFixture<WorkerVisitAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerVisitAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerVisitAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
