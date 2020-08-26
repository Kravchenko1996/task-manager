import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../interfaces/task';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';
import {AcknowledgementDialogComponent} from '../acknowledgement-dialog/acknowledgement-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ApiService} from '../../../core/services/api-service/api.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  tasksList: Task[] = [];
  deadline = new FormControl();
  @Output() onUpdate: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
  ) {
  }

  ngOnInit(): void {
    if (this.task.deadline) {
      this.deadline.setValue(this.task.deadline);
    }
  }

  editTask(): void {
    let dialogWindow = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: new Task().deserialize(this.task)
    });
    dialogWindow.afterClosed()
      .subscribe((task: Task) => {
        if (task) {
          this.updateTask(task);
        }
      });
  }

  updateTask(task: Task) {
    this.api.sendEditedTaskData(task)
      .subscribe((res) => {
        this.onUpdate.emit(res);
      });
  }

  deleteTask(): void {
    let dialogWindow = this.dialog.open(AcknowledgementDialogComponent, {
      width: '250px',
      data: `Are you sure you want to delete "${this.task.name}"?`
    });
    dialogWindow.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.api.deleteTaskData(this.task.id)
            .subscribe(() => this.onDelete.emit(this.task.id)
            );
        }
      });
  }

  changeTaskStatus(): void {
    this.task.status = !this.task.status;
    this.updateTask(this.task);
  }

  setTaskDeadline(): void {
    if (this.deadline.value) {
      let deadlineYear = this.deadline.value.getFullYear();
      let deadlineMonth = this.deadline.value.getMonth() + 1;
      let deadlineDate = this.deadline.value.getDate();
      this.task.deadline = `${deadlineYear}-${deadlineMonth}-${deadlineDate}`;
      this.updateTask(this.task);
    }
  }
}
