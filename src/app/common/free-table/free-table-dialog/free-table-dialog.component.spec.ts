import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTableDialogComponent } from './free-table-dialog.component';

describe('FreeTableDialogComponent', () => {
  let component: FreeTableDialogComponent;
  let fixture: ComponentFixture<FreeTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeTableDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
