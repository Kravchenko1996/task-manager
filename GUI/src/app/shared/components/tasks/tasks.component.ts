import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {Task} from '../../interfaces/task';
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  task: Task;
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
      .subscribe((response: Task[]) => this.tasksList = response)
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasksList, event.previousIndex, event.currentIndex);
  }

  print(event) {
    console.log(event)
  }
}
