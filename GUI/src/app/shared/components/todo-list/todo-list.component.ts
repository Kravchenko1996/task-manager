import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateToDoListDialogComponent} from "../create-todo-list-dialog/create-todo-list-dialog.component";
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../core/services/api.service";
import {ToDoList} from "../../interfaces/todo-list";
import {EditToDoListDialogComponent} from "../edit-todo-list-dialog/edit-todo-list-dialog.component";
import {AcknowledgementDialogComponent} from "../acknowledgement-dialog/acknowledgement-dialog.component";

@Component({
  selector: 'app-create-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  toDoLists: ToDoList[];

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
      .subscribe((response: ToDoList[]) => {
        this.toDoLists = response;
      })
  }

  createToDoList(): void {
    let ToDoListData = {
      ...this.toDoListForm.value
    }
    const dialogRef = this.dialog.open(CreateToDoListDialogComponent, {
      width: '250px',
      data: ToDoListData
    });
    dialogRef.afterClosed()
      .subscribe((result) => {
        console.log(result);
        ToDoListData = {name: result};
        if (ToDoListData) {
          this.api.sendNewToDoListData(ToDoListData)
            .subscribe((response) => {
              this.toDoLists.push(response);
            })
        }
      })
  }

  editToDoList(toDoList: ToDoList): void {
    let dialogWindow = this.dialog.open(EditToDoListDialogComponent, {
      width: '250px',
      data: new ToDoList().deserialize(toDoList)
    });
    dialogWindow.afterClosed()
      .subscribe((toDoList: ToDoList) => {
        if (toDoList) {
          this.api.sendEditedToDoListData(toDoList)
            .subscribe(() => {
              this.getToDoLists();
            })
        }
      })
  }

  deleteToDoList(toDoList: ToDoList): void {
    let dialogWindow = this.dialog.open(AcknowledgementDialogComponent, {
      width: '250px',
      data: `Are you sure you want to delete "${toDoList.name}"?`
    });
    dialogWindow.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.api.deleteToDoListData(toDoList.id)
            .subscribe(() => {
              this.getToDoLists();
            })
        }
      })
  }
}
