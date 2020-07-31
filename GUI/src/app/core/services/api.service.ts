import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ToDoList} from "../../shared/interfaces/todo-list";

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
          .map((item: ToDoList) => new ToDoList().deserialize(item))
        )
      );
  }

  sendNewToDoListData(formData): any {
    return this.httpClient.post(this.apiUrl + '/todo-list', formData)
      .pipe(map((response) => new ToDoList().deserialize(response)
        )
      );
  }

  sendEditedToDoListData(toDolist: ToDoList) {
    return this.httpClient.patch(this.apiUrl + '/edit-todo-list/' + toDolist.id.toString(), toDolist)
      .pipe(map((response) => new ToDoList().deserialize(response)
        )
      );
  }
  deleteToDoListData(toDoListId) {
    return this.httpClient.delete(this.apiUrl + '/delete-todo-list/' + toDoListId.toString())
  }

}
