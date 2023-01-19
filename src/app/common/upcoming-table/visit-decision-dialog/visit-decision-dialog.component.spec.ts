import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDecisionDialogComponent } from './visit-decision-dialog.component';

describe('VisitDecisionDialogComponent', () => {
  let component: VisitDecisionDialogComponent;
  let fixture: ComponentFixture<VisitDecisionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitDecisionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDecisionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
