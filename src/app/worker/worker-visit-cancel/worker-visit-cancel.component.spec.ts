import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerVisitCancelComponent } from './worker-visit-cancel.component';

describe('WorkerVisitCancelComponent', () => {
  let component: WorkerVisitCancelComponent;
  let fixture: ComponentFixture<WorkerVisitCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerVisitCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerVisitCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
