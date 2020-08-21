import {Deserializable} from "./deserializable";

export class User implements Deserializable {
  id: number;
  username: string;
  password: string;

  deserialize(input: object) {
    Object.assign(this, input);
    return this;
  }
}
