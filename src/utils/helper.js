import BigNumber from "bignumber.js";
import moment from "moment";
import { SupportedChainId } from "../constants/chains";
import Numeral from "numeral";

export const fromWei = (tokens, decimals = 18) => {
  try {
    if (!tokens) {
      return new BigNumber(0).toString();
    }

    return new BigNumber(tokens)
      .div(new BigNumber(10).exponentiatedBy(decimals))
      .toString();
  } catch (error) {
    console.log("exeption in fromWei ", error);
    return null;
  }
};

export const toWei = (tokens, decimals = 18) => {
  try {
    if (!tokens) {
      return new BigNumber(0).toString();
    }
    return new BigNumber(tokens)
      .multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
      .toFixed(0)
      .toString();
  } catch (error) {
    console.log("exeption in toWei , ", error);
    return null;
  }
};

export const formatLargeNumber = (value, precision = 2) => {
  const _value = !value ? "0" : value;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: precision,
  });

  const formattedValue = convertToInternationalCurrencySystem(
    _value,
    formatter
  );

  return formattedValue;
};

export const formatCurrency = (
  value,
  usd = false,
  fractionDigits = 1,
  currencyFormat = false
) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
  });

  //for currency format with $symbol
  if (usd) {
    return formatter.format(value ? value : 0)?.slice(1);
  }

  if (typeof window.web3 === "undefined") {
    return formatter.format(value ? value : 0).slice(1);
  }
  const netId = window.ethereum.networkVersion;
  if (["97", "56"].includes(netId) && !currencyFormat) {
    // for bsc network only
    return convertToInternationalCurrencySystem(value ? value : 0, formatter);
  }
  return formatter.format(value ? value : 0).slice(1);
};

function convertToInternationalCurrencySystem(labelValue, formatter) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? formatter
        .format((Math.abs(Number(labelValue)) / 1.0e9).toFixed(2))
        .slice(1) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? formatter
        .format((Math.abs(Number(labelValue)) / 1.0e6).toFixed(2))
        .slice(1) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? formatter
        .format((Math.abs(Number(labelValue)) / 1.0e3).toFixed(2))
        .slice(1) + "K"
    : formatter.format(Math.abs(Number(labelValue))).slice(1);
}

export const resetCurrencyFormatting = (value) => {
  return value.split(",").join("");
};

export const isNumber = (value) => {
  return !isNaN(parseInt(value));
};

export const isMetaMaskInstalled = () => {
  return typeof window.web3 !== "undefined";
};

export const formattedAddress = (address) => {
  const _address = address?.toString();
  if (!address) {
    return "";
  }

  const _formatted = _address?.slice(0, 4) + "..." + _address?.slice(-4);
  return _formatted;
};
// //input  { chainId, chainName, currency: {name, symbol, decimals }, rpcUrls, blockExplorer }
export const setupNetwork = async (networkObject) => {
  const provider = window.ethereum;
  if (provider) {
    // const _chainId = parseInt(networkObject.chainId, 10)
    try {
      if (
        networkObject.chainId ===
          `0x${SupportedChainId.MAINNET.toString(16)}` ||
        networkObject.chainId === `0x${SupportedChainId.GOERLI.toString(16)}`
      ) {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networkObject.chainId }],
        });
      }
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [networkObject],
      });
      return true;
    } catch (error) {
      console.error("Failed to setup the network in Metamask:", error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};

export const formatTime = (dateString, requirement = null) => {
  if (!dateString) {
    return "";
  }

  if (!requirement) {
    return moment(moment.utc(dateString).toDate())
      .local()
      .format("hh:mm A DD-MM-YYYY");
  }

  if (requirement === "date-only") {
    return moment(moment.utc(dateString).toDate()).local().format("DD-MM-YYYY");
  }
};

export const compareStrings = (str1, str2) => {
  if (!str1 || !str2) {
    return false;
  }
  const str1WithoutSpacing = str1?.replace(/^\s+|\s+$/gm, "");
  const str2WithoutSpacing = str1?.replace(/^\s+|\s+$/gm, "");
  return str1WithoutSpacing === str2WithoutSpacing;
};

export const recoverKeys = (key) => {
  if (!key) {
    return null;
  }
  return key?.split("").reverse().join("");
};

export const getTrxEtherscanUrl = (trxHash, chainId) => {
  if ([1, 4, 5].includes(parseInt(chainId))) {
    return `https://goerli.etherscan.io/tx/${trxHash}`;
  }

  return `https://testnet.bscscan.com/tx/${trxHash}`;
};

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

export const toK = (num) => {
  return Numeral(num).format("0.[00]a");
};

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export const formatDollarAmount = (num, digits) => {
  const formatter = new Intl.NumberFormat([], {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return formatter.format(num);
};

export const formattedNum = (number, usd = false, acceptNegatives = false) => {
  if (isNaN(number) || number === "" || number === undefined) {
    return usd ? "$0" : 0;
  }
  let num = parseFloat(number);

  if (num > 500000000) {
    return (usd ? "$" : "") + toK(num.toFixed(0), true);
  }

  if (num === 0) {
    if (usd) {
      return "$0";
    }
    return 0;
  }

  if (num < 0.0001 && num > 0) {
    return usd ? "< $0.0001" : "< 0.0001";
  }

  if (num > 1000) {
    return usd
      ? formatDollarAmount(num, 0)
      : Number(parseFloat(num).toFixed(0)).toLocaleString();
  }

  if (usd) {
    if (num < 0.1) {
      return formatDollarAmount(num, 4);
    } else {
      return formatDollarAmount(num, 2);
    }
  }

  return Number(parseFloat(num).toFixed(4)).toString();
};
