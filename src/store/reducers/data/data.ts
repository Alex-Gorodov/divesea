import { createReducer } from "@reduxjs/toolkit";
import { DataState } from "../../../types/state";
import { createNFT, addBid, toggleLike, loadItems, loadUsers, setItemsDataLoadingStatus, setUsersDataLoadingStatus } from "../../actions";

const initialState: DataState = {
  items: [],
  users: [],
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
    .addCase(setItemsDataLoadingStatus, (state, action) => {
      state.isItemsDataLoading = action.payload.isItemsDataLoading;
    })
    .addCase(setUsersDataLoadingStatus, (state, action) => {
      state.isUsersDataLoading = action.payload.isUsersDataLoading;
    })
    .addCase(createNFT, (state, action) => {
      state.items.push(action.payload.item);
    })
    .addCase(addBid, (state, action) => {
      const { bid, item } = action.payload;
      const itemToUpdate = state.items.find(i => i.id === item.id);
      if (itemToUpdate) {
        if (!Array.isArray(itemToUpdate.bids)) {
          itemToUpdate.bids = [];
        }
        itemToUpdate.bids.push(bid);
      }
      if (itemToUpdate !== undefined) state.items[item.id].bids = itemToUpdate.bids;
    })
    
    
    .addCase(toggleLike, (state, action) => {
      const { like, item } = action.payload;
      const itemIndex = state.items.findIndex((i) => i.id === item.id);
      if (itemIndex !== -1) {
        state.items[itemIndex].likes = like ? state.items[itemIndex].likes + 1 : state.items[itemIndex].likes - 1;
      }
    })
})
