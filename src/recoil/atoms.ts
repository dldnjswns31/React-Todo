import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "todo",
  default: {
    "To Do": [
      { id: 1, text: "hello" },
      { id: 2, text: "hi" },
      { id: 3, text: "bye" },
    ],
    Doing: [],
    Done: [],
  },
});
