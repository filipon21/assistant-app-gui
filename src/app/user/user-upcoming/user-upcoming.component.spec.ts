import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpcomingComponent } from './user-upcoming.component';

describe('UserUpcomingComponent', () => {
  let component: UserUpcomingComponent;
  let fixture: ComponentFixture<UserUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpcomingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
