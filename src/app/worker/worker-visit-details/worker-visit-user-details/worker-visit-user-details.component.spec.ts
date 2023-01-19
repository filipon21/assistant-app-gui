import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerVisitUserDetailsComponent } from './worker-visit-user-details.component';

describe('WorkerVisitUserDetailsComponent', () => {
  let component: WorkerVisitUserDetailsComponent;
  let fixture: ComponentFixture<WorkerVisitUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerVisitUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerVisitUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
