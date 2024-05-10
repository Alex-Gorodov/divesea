import { createReducer } from "@reduxjs/toolkit";
import { PageState } from "../../../types/state";
import { setUploadedNftPath, toggleBidForm, toggleWalletForm } from "../../actions";

const initialState: PageState = {
  uploadedNftPath: null,
  isBidFormOpened: false,
  bidItem: null,
  isWalletFormOpened: false,
}

export const pageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUploadedNftPath, (state, action) => {
      const { path } = action.payload;
      state.uploadedNftPath = path;
    })
    .addCase(toggleBidForm, (state, action) => {
      const { isOpened, item } = action.payload;
      state.isBidFormOpened = isOpened;
      state.bidItem = item;
    })
    .addCase(toggleWalletForm, (state, action) => {
      const { isWalletFormOpened } = action.payload;
      state.isWalletFormOpened = isWalletFormOpened;
    })
})
