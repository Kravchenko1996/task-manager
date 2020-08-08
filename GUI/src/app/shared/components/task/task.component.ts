import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {Task} from '../../interfaces/task';
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {AcknowledgementDialogComponent} from "../acknowledgement-dialog/acknowledgement-dialog.component";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-create-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  currentTask: string;
  @Input() toDoListId;
  tasksList: Task[] = [];
  deadline = new FormControl();

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
          this.currentTask = '';
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

  deleteTask(task: Task): void {
    let dialogWindow = this.dialog.open(AcknowledgementDialogComponent, {
      width: '250px',
      data: `Are you sure you want to delete "${task.name}"?`
    });
    dialogWindow.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.api.deleteTaskData(task.id)
            .subscribe(() => {
              this.getTasks();
            })
        }
      })
  }

  changeTaskStatus(task: Task): void {
    task.status = !task.status
    this.api.changeTaskStatus(task)
      .subscribe((response: Task) => {
        console.log(response.status)
      })
  }

  setTaskDeadline(task: Task): void {
    let deadlineYear = this.deadline.value.getFullYear();
    let deadlineMonth = this.deadline.value.getMonth() + 1;
    let deadlineDate = this.deadline.value.getDate();
    task.deadline = `${deadlineYear}-${deadlineMonth}-${deadlineDate}`;
    this.api.setTaskDeadline(task)
      .subscribe(() => this.getTasks());
  }

}
