import { combineReducers } from "redux";
import { SellReducer } from "./page/page-reducer";

export const rootReducer = combineReducers({
  sell: SellReducer
})

export type RootState = ReturnType<typeof rootReducer>;
