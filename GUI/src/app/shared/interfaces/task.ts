import {Deserializable} from "./deserializable";
import {ToDoList} from "./todo-list";

export class Task implements Deserializable {
  id: number;
  name: string;
  status: boolean;
  deadline: string;
  toDoList: ToDoList;
  order: number = 0;

  deserialize(input: object) {
    Object.assign(this, input);
    this.toDoList = new ToDoList().deserialize(this.toDoList);
    return this;
  }
}
