import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerVisitAppointmentUserTableComponent } from './worker-visit-appointment-user-table.component';

describe('WorkerVisitAppointmentUserTableComponent', () => {
  let component: WorkerVisitAppointmentUserTableComponent;
  let fixture: ComponentFixture<WorkerVisitAppointmentUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerVisitAppointmentUserTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerVisitAppointmentUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
