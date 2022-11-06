import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingTableComponent } from './upcoming-table.component';

describe('UpcomingTableComponent', () => {
  let component: UpcomingTableComponent;
  let fixture: ComponentFixture<UpcomingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
