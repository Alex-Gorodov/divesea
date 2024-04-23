import { combineReducers } from "redux";
import { SellReducer } from "./sell/sell-reducer";

export const rootReducer = combineReducers({
  sell: SellReducer
})

export type RootState = ReturnType<typeof rootReducer>;
