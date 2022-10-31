import { GET_TOKENS } from "../actions/types";

const initalState = {
  tokens: [],
  error: null,
};

export default function (state = initalState, action) {
  // todo design and write action types and state updates
  switch (action.type) {
    case GET_TOKENS:
      return {
        ...state,
        tokens: action.payload,
      };

    default:
      return state;
  }
}
