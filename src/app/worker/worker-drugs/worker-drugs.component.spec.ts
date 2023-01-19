import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDrugsComponent } from './worker-drugs.component';

describe('WorkerDrugsComponent', () => {
  let component: WorkerDrugsComponent;
  let fixture: ComponentFixture<WorkerDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerDrugsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
