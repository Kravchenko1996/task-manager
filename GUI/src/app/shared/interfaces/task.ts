import {Deserializable} from "./deserializable";
import {ToDoList} from "./todo-list";

export class Task implements Deserializable {
  id: number;
  name: string;
  status: string;
  deadline: string;
  completed: boolean;
  toDoList: ToDoList;

  deserialize(input: object) {
    Object.assign(this, input);
    this.toDoList = new ToDoList().deserialize(this.toDoList);
    return this;
  }
}
