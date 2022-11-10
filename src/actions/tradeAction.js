import { getTokenPriceFromCoinGecko } from "../utils/helper";
import { GET_ENTRY_PRICE } from "./types";

export const fetchOpenTrades = (account, chainId) => async (dispatch) => {
  if (!account) {
    return;
  }
  //: todo perform fetch operations and dispatch results to stores
};

export const getEntryPrice = (token) => async (dispatch) => {
  if (!token?.symbol) {
    return;
  }

  const price = await getTokenPriceFromCoinGecko(token);
  dispatch({ type: GET_ENTRY_PRICE, payload: price });
};
