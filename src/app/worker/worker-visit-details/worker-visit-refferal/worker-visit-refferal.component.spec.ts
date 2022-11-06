import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerVisitRefferalComponent } from './worker-visit-refferal.component';

describe('WorkerVisitRefferalComponent', () => {
  let component: WorkerVisitRefferalComponent;
  let fixture: ComponentFixture<WorkerVisitRefferalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerVisitRefferalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerVisitRefferalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
