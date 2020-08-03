import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {Task} from '../../interfaces/task';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";

@Component({
  selector: 'app-create-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() toDoListId;
  tasksList: Task[] = [];

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.api.getTasksData()
      .subscribe((response: Task[]) => {
        this.tasksList = response;
      })
  }

  createTask(newTask): void {
    if (newTask) {
      let newTaskData = {
        name: newTask,
        project: this.toDoListId
      }
      this.api.sendNewTaskData(newTaskData)
        .subscribe(response => {
          this.tasksList.push(response)
        })
    }
  }

  editTask(task: Task): void {
    let dialogWindow = this.dialog.open(EditDialogComponent, {
      width: "250px",
      data: new Task().deserialize(task)
    });
    dialogWindow.afterClosed()
      .subscribe((task: Task) => {
        if (task) {
          this.api.sendEditedTaskData(task)
            .subscribe(() => this.getTasks())
        }
      })
  }
}
