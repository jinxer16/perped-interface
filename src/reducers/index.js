import { combineReducers } from "redux";
import list from "./listReducer";
import multicall from "../state/multicall/reducer";

export default combineReducers({
  list: list,
  multicall: multicall,
});
