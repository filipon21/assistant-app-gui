import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerVisitExemptionComponent } from './worker-visit-exemption.component';

describe('WorkerVisitExemptionComponent', () => {
  let component: WorkerVisitExemptionComponent;
  let fixture: ComponentFixture<WorkerVisitExemptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerVisitExemptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerVisitExemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
