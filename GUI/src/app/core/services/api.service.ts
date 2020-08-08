import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ToDoList} from "../../shared/interfaces/todo-list";
import {Task} from "../../shared/interfaces/task";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://127.0.0.1:8000/api/v1beta"

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getToDoListsData(): any {
    return this.httpClient.get(this.apiUrl + '/todo-lists')
      .pipe(map((response: ToDoList[]) => response
        .map((item: ToDoList) => new ToDoList().deserialize(item))));
  }

  sendNewToDoListData(formData): any {
    return this.httpClient.post(this.apiUrl + '/create-todo-list', formData)
      .pipe(map((response) => new ToDoList().deserialize(response)));
  }

  sendEditedToDoListData(toDolist: ToDoList) {
    return this.httpClient.patch(this.apiUrl + '/edit-todo-list/' + toDolist.id.toString(), toDolist)
      .pipe(map((response) => new ToDoList().deserialize(response)));
  }

  deleteToDoListData(toDoListId) {
    return this.httpClient.delete(this.apiUrl + '/delete-todo-list/' + toDoListId.toString());
  }

  getTasksData(): any {
    return this.httpClient.get(this.apiUrl + '/tasks')
      .pipe(map((response: any) => (
        response.map((task: Task) => new Task().deserialize(task)))));
  }

  sendNewTaskData(formData) {
    return this.httpClient.post(this.apiUrl + '/create-task', formData)
      .pipe(map((response) => new Task().deserialize(response)));
  }

  sendEditedTaskData(task: Task) {
    return this.httpClient.patch(this.apiUrl + '/edit-task/' + task.id.toString(), task)
      .pipe(map((response) => new Task().deserialize(response)));
  }

  deleteTaskData(taskId) {
    return this.httpClient.delete(this.apiUrl + '/delete-task/' + taskId.toString());
  }

  changeTaskStatus(task: Task) {
    return this.httpClient.patch(this.apiUrl + '/change-task-status/' + task.id.toString(), task)
      .pipe(map((response) => new Task().deserialize(response)));
  }

  setTaskDeadline(task: Task) {
    return this.httpClient.patch(this.apiUrl + '/set-task-deadline/' + task.id.toString(), task)
      .pipe(map((response) => new Task().deserialize(response)));
  }
}
