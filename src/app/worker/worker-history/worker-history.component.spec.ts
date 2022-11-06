import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerHistoryComponent } from './worker-history.component';

describe('WorkerHistoryComponent', () => {
  let component: WorkerHistoryComponent;
  let fixture: ComponentFixture<WorkerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
