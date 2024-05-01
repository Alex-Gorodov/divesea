import { createReducer } from "@reduxjs/toolkit";
import { items } from "../../mocks/items";
import { users } from "../../mocks/users";
import { AppState } from "../../types/state";
import { addBid, createNFT, setUploadedNftPath, toggleBidForm, toggleLike } from "./page-actions";
import { bids } from "../../mocks/bids";

const initialState: AppState = {
  items: items,
  users: users,
  bids: bids,
  uploadedNftPath: null,
  isBidFormOpened: false,
}

export const SellReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUploadedNftPath, (state, action) => {
      const { path } = action.payload;
      state.uploadedNftPath = path;
    })
    .addCase(createNFT, (state, action) => {
      const { item } = action.payload;
      state.items.push(item);
    })
    .addCase(toggleBidForm, (state, action) => {
      const { isOpened } = action.payload;
      state.isBidFormOpened = isOpened;
    })
    .addCase(addBid, (state, action) => {
      const { bid } = action.payload;
      state.bids.unshift(bid);
    })
    .addCase(toggleLike, (state, action) => {
      const { like, item } = action.payload;
      state.items[item.id].likes = like ? state.items[item.id].likes + 1 : state.items[item.id].likes - 1;
    })
})
