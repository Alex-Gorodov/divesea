import { store } from "../store";
import { Item } from "./item";
import { User } from "./user";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type DataState = {
  items: Item[];
  users: User[];
  isItemsDataLoading: boolean;
  isUsersDataLoading: boolean;
}

export type PageState = {
  uploadedNftPath: string | null;
  isBidFormOpened: boolean;
  bidItem: Item | null;
  isWalletFormOpened: boolean;
}
