import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../core/services/api-service/api.service';
import {Task} from '../../interfaces/task';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {fade} from '../../../core/animations/animations';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [fade]
})
export class TasksComponent implements OnInit {

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
    this.api.getTasksData(this.toDoListId)
      .subscribe(
        (response: Task[]) => this.tasksList = response
      );
  }

  createTask(newTaskName: string): void {
    if (newTaskName) {
      let newTaskData = {
        name: newTaskName,
        project: this.toDoListId
      };
      this.api.sendNewTaskData(newTaskData)
        .subscribe(response => {
          this.tasksList.push(response);
          this.currentTask = undefined;
        });
    }
  }

  changeTaskOrder(event: CdkDragDrop<string[]>, task: Task) {
    if (task.order != event.currentIndex) {
      moveItemInArray(this.tasksList, event.previousIndex, event.currentIndex);
      this.tasksList
        .forEach(
          (task, index) => {
            task.order = index;
            this.api.sendEditedTaskData(task)
              .subscribe(
              );
          });
    }
  }

  refreshTask(task: Task): void {
    let oldTask = this.tasksList.find(
      (oldTask) => task.id == oldTask.id
    );
    oldTask.order = task.order;
    oldTask.deadline = task.deadline;
    oldTask.status = task.status;
    oldTask.name = task.name;
  }

  removeTask(taskId: number): void {
    this.tasksList = this.tasksList.filter(
      (task) => task.id != taskId
    );
  }
}
