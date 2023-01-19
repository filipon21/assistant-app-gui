import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerVisitDetailsComponent } from './worker-visit-details.component';

describe('WorkerVisitDetailsComponent', () => {
  let component: WorkerVisitDetailsComponent;
  let fixture: ComponentFixture<WorkerVisitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerVisitDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerVisitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
