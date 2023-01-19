import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingTableDialogComponent } from './upcoming-table-dialog.component';

describe('UpcomingTableDialogComponent', () => {
  let component: UpcomingTableDialogComponent;
  let fixture: ComponentFixture<UpcomingTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingTableDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
