import { store } from "../store";
import { Bid } from "./bid";
import { Item } from "./item";
import { User } from "./user";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type DataState = {
  items: Item[];
  users: User[];
  bids: Bid[];
  isItemsDataLoading: boolean;
  isUsersDataLoading: boolean;
  isBidsDataLoading: boolean;
}

export type PageState = {
  uploadedNftPath: string | null;
  isBidFormOpened: boolean;
}
