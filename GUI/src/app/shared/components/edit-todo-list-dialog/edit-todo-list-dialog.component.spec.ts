import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditToDoListDialogComponent } from './edit-todo-list-dialog.component';

describe('EditToDoListDialogComponent', () => {
  let component: EditToDoListDialogComponent;
  let fixture: ComponentFixture<EditToDoListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditToDoListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditToDoListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
