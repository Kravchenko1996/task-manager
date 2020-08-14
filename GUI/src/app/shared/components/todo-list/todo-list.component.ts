import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../../../core/services/api.service";
import {ToDoList} from "../../interfaces/todo-list";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {AcknowledgementDialogComponent} from "../acknowledgement-dialog/acknowledgement-dialog.component";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Input() toDoList: ToDoList;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {
  }

  editToDoList(): void {
    let dialogWindow = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: new ToDoList().deserialize(this.toDoList)
    });
    dialogWindow.afterClosed()
      .subscribe((toDoList: ToDoList) => {
        if (toDoList) this.updateToDoList();
      })
  }

  deleteToDoList(): void {
    let dialogWindow = this.dialog.open(AcknowledgementDialogComponent, {
      width: '250px',
      data: `Are you sure you want to delete "${this.toDoList.name}"?`
    });
    dialogWindow.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.api.deleteToDoListData(this.toDoList.id)
            .subscribe(() => this.onUpdate.emit())
        }
      })
  }

  updateToDoList() {
    this.api.sendEditedToDoListData(this.toDoList)
      .subscribe(() => this.onUpdate.emit());
  }
}
