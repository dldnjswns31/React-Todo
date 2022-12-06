import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: ITodo[];
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedToDo = localStorage.getItem(key);

    if (savedToDo !== null) {
      setSelf(JSON.parse(savedToDo));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const toDoState = atom<IToDoState>({
  key: "todo",
  default: {},
  effects: [localStorageEffect("todo")],
});
