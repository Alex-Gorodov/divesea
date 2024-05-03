
import { combineReducers } from "@reduxjs/toolkit";
import { dataReducer } from "./reducers/data/data";
import { pageReducer } from "./reducers/page/page";

export const rootReducer = combineReducers({
  data: dataReducer,
  page: pageReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
