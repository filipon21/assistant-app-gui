import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVisitActionComponent } from './user-visit-action.component';

describe('UserVisitActionComponent', () => {
  let component: UserVisitActionComponent;
  let fixture: ComponentFixture<UserVisitActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVisitActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVisitActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
