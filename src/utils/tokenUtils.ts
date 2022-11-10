import { BigNumber, ethers } from "ethers";
import { expandDecimals } from "./number";
import { MARKET, PRECISION, USDG_ADDRESS } from "./tradeUtils";

export function getTriggerPrice(
  tokenAddress: string,
  max: boolean,
  minPrice: number,
  maxPrice: number,
  orderOption?: string,
  triggerPriceUsd?: BigNumber
) {
  // Limit/stop orders are executed with price specified by user
  if (orderOption && orderOption !== MARKET && triggerPriceUsd) {
    return triggerPriceUsd;
  }

  // Market orders are executed with current market price

  if (max && !maxPrice) {
    return;
  }
  if (!max && !minPrice) {
    return;
  }
  return max ? maxPrice : minPrice;
}

export function getUsd(
  amount: BigNumber,
  tokenAddress: string,
  max: boolean,
  tokenDecimals: number,
  orderOption?: string,
  triggerPriceUsd?: BigNumber
) {
  if (!amount) {
    return;
  }
  if (tokenAddress === USDG_ADDRESS) {
    return amount.mul(PRECISION).div(expandDecimals(1, 18));
  }

  //: todo clarify minPrice and maxPrice
  const minPrice = 0;
  const maxPrice = 0;
  // const info = getTokenInfo(infoTokens, tokenAddress);
  const price = getTriggerPrice(
    tokenAddress,
    max,
    minPrice,
    maxPrice,
    orderOption,
    triggerPriceUsd
  );
  if (!price) {
    return;
  }

  return amount.mul(price).div(expandDecimals(1, tokenDecimals));
}
