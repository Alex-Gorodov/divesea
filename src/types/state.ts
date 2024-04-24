import { store } from "../store";
import { Item } from "./item";
import { User } from "./user";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppState = {
  items: Item[];
  users: User[];
  uploadedNftPath: string | null;
  isBidFormOpened: boolean;
}
