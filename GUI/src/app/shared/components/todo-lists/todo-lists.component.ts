import {Component, OnInit} from '@angular/core';
import {ToDoList} from "../../interfaces/todo-list";
import {CreateToDoListDialogComponent} from "../create-todo-list-dialog/create-todo-list-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../core/services/api.service";

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})
export class TodoListsComponent implements OnInit {

  toDoLists: ToDoList[] = [];
  toDoListForm = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.getToDoLists();
  }

  getToDoLists(): void {
    this.api.getToDoListsData()
      .subscribe((response: ToDoList[]) => this.toDoLists = response);
  }

  createToDoList(): void {
    let toDoListData = {
      ...this.toDoListForm.value
    }
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
              .subscribe(response => this.toDoLists.push(response))
          }
        }
      })
  }

}
