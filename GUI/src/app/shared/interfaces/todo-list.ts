import {Deserializable} from "./deserializable";

export class ToDoList implements Deserializable {
  id: number;
  name: string;

  deserialize(input: object) {
    Object.assign(this, input);
    return this;
  }
}
