import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssistantListComponent } from './user-assistant-list.component';

describe('UserAssistantListComponent', () => {
  let component: UserAssistantListComponent;
  let fixture: ComponentFixture<UserAssistantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAssistantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssistantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
