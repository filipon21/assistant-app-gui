import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingTableStartVisitComponent } from './upcoming-table-start-visit.component';

describe('UpcomingTableStartVisitComponent', () => {
  let component: UpcomingTableStartVisitComponent;
  let fixture: ComponentFixture<UpcomingTableStartVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingTableStartVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingTableStartVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
