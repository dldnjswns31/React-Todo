import { atom } from "recoil";

export interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "todo",
  default: {
    "To Do": ["a", "b"],
    Doing: ["c", "d", "e"],
    Done: ["f", "g"],
  },
});
