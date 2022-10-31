import allTokens from "../utils/data/tokens.json";
import { GET_TOKENS } from "./types";

export const getTokenList = () => async (dispatch) => {
  const tokens = allTokens;
  dispatch({
    type: GET_TOKENS,
    payload: tokens,
  });
};
