import { createReducer } from "@reduxjs/toolkit";
import { items } from "../../mocks/items";
import { users } from "../../mocks/users";
import { AppState } from "../../types/state";
import { createNFT, setUploadedNftPath } from "./sell-actions";

const initialState: AppState = {
  items: items,
  users: users,
  uploadedNftPath: null
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
      console.log(state.items.length);
    })
})
