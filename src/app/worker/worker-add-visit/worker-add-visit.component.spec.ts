import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerAddVisitComponent } from './worker-add-visit.component';

describe('WorkerAddVisitComponent', () => {
  let component: WorkerAddVisitComponent;
  let fixture: ComponentFixture<WorkerAddVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerAddVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerAddVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
