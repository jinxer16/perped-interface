import { GET_ENTRY_PRICE } from "../actions/types";

const initalState = {
  entryPrice: "",
  error: null,
};

export default function (state = initalState, action) {
  // todo design and write action types and state updates
  switch (action.type) {
    case GET_ENTRY_PRICE:
      return {
        ...state,
        entryPrice: action.payload,
      };

    default:
      return state;
  }
}
