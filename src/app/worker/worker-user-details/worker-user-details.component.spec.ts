import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerUserDetailsComponent } from './worker-user-details.component';

describe('WorkerUserDetailsComponent', () => {
  let component: WorkerUserDetailsComponent;
  let fixture: ComponentFixture<WorkerUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
