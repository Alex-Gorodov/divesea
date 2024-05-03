import { createReducer } from "@reduxjs/toolkit";
import { DataState } from "../../../types/state";
import { createNFT, addBid, toggleLike, loadItems, loadUsers, loadBids, setItemsDataLoadingStatus, setUsersDataLoadingStatus, setBidsDataLoadingStatus } from "../../actions";

const initialState: DataState = {
  items: [],
  users: [],
  bids: [],
  isItemsDataLoading: false,
  isUsersDataLoading: false,
  isBidsDataLoading: false
}

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadItems, (state, action) => {
      state.items = action.payload.items;
    })
    .addCase(loadUsers, (state, action) => {
      state.users = action.payload.users;
    })
    .addCase(loadBids, (state, action) => {
      state.bids = action.payload.bids;
    })
    .addCase(setItemsDataLoadingStatus, (state, action) => {
      state.isItemsDataLoading = action.payload.isItemsDataLoading;
    })
    .addCase(setUsersDataLoadingStatus, (state, action) => {
      state.isUsersDataLoading = action.payload.isUsersDataLoading;
    })
    .addCase(setBidsDataLoadingStatus, (state, action) => {
      state.isBidsDataLoading = action.payload.isBidsDataLoading;
    })
    .addCase(createNFT, (state, action) => {
      state.items.push(action.payload.item);
    })
    .addCase(addBid, (state, action) => {
      state.bids.unshift(action.payload.bid);
    })
    .addCase(toggleLike, (state, action) => {
      const { like, item } = action.payload;
      const itemIndex = state.items.findIndex((i) => i.id === item.id);
      if (itemIndex !== -1) {
        state.items[itemIndex].likes = like ? state.items[itemIndex].likes + 1 : state.items[itemIndex].likes - 1;
      }
    })
})
