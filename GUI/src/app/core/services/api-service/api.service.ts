import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToDoList} from '../../../shared/interfaces/todo-list';
import {Task} from '../../../shared/interfaces/task';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.baseUrl + '/api/v1beta';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getToDoListsData(): any {
    return this.httpClient.get(this.apiUrl + '/projects')
      .pipe(map((response: ToDoList[]) =>
        response
          .map(
            (item: ToDoList) => new ToDoList().deserialize(item)
          )
      ));
  }

  sendNewToDoListData(formData): any {
    return this.httpClient.post(this.apiUrl + '/create-project', formData)
      .pipe(map((response) => new ToDoList()
        .deserialize(response)
      ));
  }

  sendEditedToDoListData(toDoList: ToDoList) {
    return this.httpClient.put(this.apiUrl + '/edit-project/' + toDoList.id.toString(), toDoList)
      .pipe(map((response) => new ToDoList()
        .deserialize(response)
      ));
  }

  deleteToDoListData(toDoListId) {
    return this.httpClient.delete(this.apiUrl + '/delete-project/' + toDoListId.toString());
  }

  getTasksData(toDoListId): any {
    return this.httpClient.get(this.apiUrl + '/tasks/' + toDoListId.toString())
      .pipe(map((response: any) => (
        response
          .map((task: Task) => new Task()
            .deserialize(task)
          ))));
  }

  sendNewTaskData(formData) {
    return this.httpClient.post(this.apiUrl + '/create-task', formData)
      .pipe(map((response) => new Task()
        .deserialize(response)
      ));
  }

  sendEditedTaskData(task: Task) {
    return this.httpClient.put(this.apiUrl + '/edit-task/' + task.id.toString(), task)
      .pipe(map((response) => new Task()
        .deserialize(response)
      ));
  }

  deleteTaskData(taskId) {
    return this.httpClient.delete(this.apiUrl + '/delete-task/' + taskId.toString());
  }
}
