import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToDoListDialogComponent } from './create-todo-list-dialog.component';

describe('CreateToDoListDialogComponent', () => {
  let component: CreateToDoListDialogComponent;
  let fixture: ComponentFixture<CreateToDoListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateToDoListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateToDoListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
