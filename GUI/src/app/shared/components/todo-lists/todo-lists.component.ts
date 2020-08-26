import {Component, OnInit} from '@angular/core';
import {ToDoList} from '../../interfaces/todo-list';
import {CreateToDoListDialogComponent} from '../create-todo-list-dialog/create-todo-list-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../core/services/api-service/api.service';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})
export class TodoListsComponent implements OnInit {

  toDoLists: ToDoList[] = [];
  toDoListForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.toDoListForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.getToDoLists();
  }

  getToDoLists(): void {
    this.api.getToDoListsData()
      .subscribe((response: ToDoList[]) => this.toDoLists = response);
  }

  createToDoList(): void {
    let toDoListData = {
      ...this.toDoListForm.value
    };
    const dialogRef = this.dialog.open(CreateToDoListDialogComponent, {
      width: '250px',
      data: toDoListData
    });
    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          toDoListData = {name: result};
          if (toDoListData) {
            this.api.sendNewToDoListData(toDoListData)
              .subscribe(response => this.toDoLists.push(response));
          }
        }
      });
  }

  refreshToDoList(toDoList: ToDoList): void {
    let oldToDoList = this.toDoLists.find(
      (oldToDoList) => toDoList.id == oldToDoList.id
    );
    let index: number = this.toDoLists.indexOf(oldToDoList);
    this.toDoLists[index] = toDoList;
  }

  removeToDoList(toDoListId: number): void {
    this.toDoLists = this.toDoLists.filter(
      (toDoList) => toDoList.id != toDoListId
    );
  }
}
