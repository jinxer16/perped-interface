import { combineReducers } from "redux";
import userReducer from "./userReducer";
import multicall from "../state/multicall/reducer";

export default combineReducers({
  user: userReducer,
  multicall: multicall,
});
