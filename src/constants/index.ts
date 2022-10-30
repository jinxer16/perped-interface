export const NetworkContextName = "NETWORK";
export const WALLET_SUPORTED_ON_CHAINS = [
  1, 4, 5, 1285, 1287, 97, 56, 137, 80001, 1666700000, 1666600000,
];

export const FALLBACK_DEFAULT_CHAIN = 137; // Todo change this for release
export const DAPP_SUPPORTED_ON_CHAINS = [137];
export const FALLBACK_DEFAULT_FIAT = "INR";

export const ALLOWANCE_AMOUNT = "999999999";

export const P2P_TRADE_FEE = 0.25;

export const TOKEN_ADDRESS = {
  PBR: {
    1: "0x298d492e8c1d909D3F63Bc4A36C66c64ACB3d695",
    4: "0xf6c9FF0543f932178262DF8C81A12A3132129b51",
    5: "0x89f01bc9865324583380d8d7ed08b8046bffd7fd",
    56: "",
    97: "0xcdc22234e41a94ef3c028e0208b0f55cb63a3008",
  },
  USDT: {
    1: "",
    5: "0x1cfd6813a59d7b90c41dd5990ed99c3bf2eb8f55",
  },
  BUSD: {
    56: "",
    97: "0x84a73728582591a1aa90a25a07f4f636331d6c1e",
  },
};

export const WETH_ADDRESS = {
  1: "",
  4: "0xc778417e063141139fce010982780140aa0cd5ab",
  5: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
  56: "",
  97: "0xae13d989dac2f0debff460ac112a837c89baa7cd", // bnb for bsc chain
};
// tahir:   "0x0A55Cfdc230d9B7B161f77842b899c4D0A14EcD9"
//henry:  0xC76Eebd14F1E5BAe5e70F349d08e54c5E7df6516

// claim PolkaBridgeFaucet contract Addresses
export const FAUCET_ADDRESSES: { [index: number]: string } = {
  1: "",
  5: "0x08114Eda0FD31B2D71586260Eb01DB064E1e8624",
  1981: "0x08114Eda0FD31B2D71586260Eb01DB064E1e8624",
  56: "",
  97: "0x252F9d11d193820997D38298346B381f53a54B5e",
};

export const P2P_ADDRESSES: { [index: number]: string } = {
  1: "",
  4: "0x55C4F673BAb13F3Ae1aBe6B8Fd3b3e83A70B8691",
  5: "0x44A8D5E1F533438c0d017021C90347B5a5278ABf",
  56: "",
  97: "0xD64c0FBEe803AfB35ed721a3E67261e1a41f86c5",
};

export const VALIDATOR_CONTRACT: { [index: number]: string } = {
  1: "",
  4: "0x8D200a1466407adFF3Ac5b3BbBBa1c283A4f2DD5",
  5: "0x44FFBB6126774F45B2e73c84d43bBd951a992198",
  56: "",
  97: "0xEa73332604740B078495614B3d08BA442Eea9A97",
};

export const CONNECTOR_TYPE = {
  injected: "injected",
  walletConnect: "walletConnect",
  unstoppable: "unstoppable",
};

export const NETWORK_TYPE = 1; // testing:1, mainnet:0
export const SUPPORTED_PAYMENT_METHODS = ["upi", "BANK TRANSFER"];

export const TRADE_FEE = 1;

export const NATIVE_TOKENS = {
  4: {
    name: "Ether",
    decimals: 18,
    symbol: "ETH",
    address: "",
    chainId: 5,
  },
  5: {
    name: "Ether",
    decimals: 18,
    symbol: "ETH",
    address: "",
    chainId: 5,
  },
  97: {
    name: "Binance Token",
    decimals: 18,
    symbol: "BNB",
    address: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
    chainId: 97,
  },
  137: {
    name: "Matic",
    decimals: 18,
    symbol: "MATIC",
    address: "",
    chainId: 137,
  },
};

export const GLOBAL_FIAT_LIST = [
  {
    added_at: "2022-06-20T11:43:48.690Z",
    _id: "6263a50d54f64766e549a621",
    country_name: "United States",
    fiat: "USD",
    fiat_label: "US doller",
    flag_url: "images/USD.png",
  },
  {
    added_at: "2022-06-20T11:43:48.690Z",
    _id: "6267e54c3c805016884e50f9",
    country_name: "India",
    fiat: "INR",
    fiat_label: "Indian rupees",
    flag_url: "images/INR.png",
  },
];

// mongodb document snapshot
export const GLOBAL_TOKEN_LIST: { [index: number]: Array<any> } = {
  1: [],
  4: [
    {
      added_at: "2022-04-23T06:59:34.052Z",
      _id: "6267ce443c805016884e50f7",
      name: "Polkabridge",
      symbol: "PBR",
      address: "0xf6c9FF0543f932178262DF8C81A12A3132129b51",
      decimals: 18,
      __v: 0,
      active: true,
      chainId: 4,
      logo: "https://assets.coingecko.com/coins/images/13744/small/symbol-whitebg200x200.png?1611377553",
    },
    {
      added_at: "2022-04-23T06:59:34.052Z",
      _id: "6290cb40ff6247480e2261bd",
      name: "US Tether",
      symbol: "USDT",
      address: "0xe687b0a94c3A20540552d981cD311a6812759dF8",
      decimals: 6,
      __v: 0,
      active: true,
      logo: "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707",
      chainId: 4,
    },
    {
      added_at: "2022-04-23T06:59:34.052Z",
      _id: "6290cc4dff6247480e2261be",
      name: "Ethereum",
      symbol: "ETH",
      address: "0xc778417e063141139fce010982780140aa0cd5ab",
      decimals: 18,
      __v: 0,
      active: true,
      logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
      chainId: 4,
    },
  ],
  5: [
    {
      _id: "633ab83318b3d7e397763a49",
      added_at: {
        $date: {
          $numberLong: "1650697174052",
        },
      },
      name: "Polkabridge",
      symbol: "PBR",
      address: "0x89f01bc9865324583380d8d7ed08b8046bffd7fd",
      decimals: 18,
      __v: 0,
      active: true,
      chainId: 5,
      logo: "https://assets.coingecko.com/coins/images/13744/small/symbol-whitebg200x200.png?1611377553",
    },
    {
      _id: "633ab84818b3d7e397763a4a",
      added_at: {
        $date: {
          $numberLong: "1650697174052",
        },
      },
      name: "US Tether",
      symbol: "USDT",
      address: "0x1cfd6813a59d7b90c41dd5990ed99c3bf2eb8f55",
      decimals: 6,
      __v: 0,
      active: true,
      logo: "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707",
      chainId: 5,
    },
    {
      _id: "633ab86f18b3d7e397763a4b",
      added_at: {
        $date: {
          $numberLong: "1650697174052",
        },
      },
      name: "Ethereum",
      symbol: "ETH",
      address: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
      decimals: 18,
      __v: 0,
      active: true,
      logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
      chainId: 5,
    },
  ],
  56: [
    {
      added_at: "2022-04-23T06:57:12.957Z",
      _id: "6263a34c3f3536307ddd741a",
      name: "BNB Token",
      symbol: "BNB",
      address: "0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F",
      chainId: 97,
      decimals: 18,
      __v: 0,
      active: true,
      logo: "https://assets.coingecko.com/coins/images/12591/small/binance-coin-logo.png?1600947313",
    },
    {
      added_at: "2022-04-23T06:59:34.052Z",
      _id: "6263a3e538fd8c30a7c4d8b8",
      name: "BUSD Token",
      symbol: "BUSD",
      address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      chainId: 97,
      decimals: 18,
      __v: 0,
    },
    {
      added_at: "2022-04-23T06:59:34.052Z",
      _id: "6263a3e638fd8c30a7c4d8c1",
      name: "Tether USD",
      symbol: "USDT",
      address: "0x496aA3FE91d239469a797379986948d94e893494",
      chainId: 97,
      decimals: 18,
      __v: 0,
      logo: "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707",
    },
    {
      added_at: "2022-04-23T06:59:34.052Z",
      _id: "63246e6eaa980102011a42d1",
      name: "Polkabridge",
      symbol: "PBR",
      address: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
      chainId: 97,
      decimals: 18,
      __v: 0,
      logo: "https://assets.coingecko.com/coins/images/13744/small/symbol-whitebg200x200.png?1611377553",
    },
  ],
  97: [
    {
      added_at: "2022-04-23T06:57:12.957Z",
      _id: "6263a34c3f3536307ddd741a",
      name: "BNB Token",
      symbol: "BNB",
      address: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      chainId: 97,
      decimals: 18,
      __v: 0,
      active: true,
      logo: "https://assets.coingecko.com/coins/images/12591/small/binance-coin-logo.png?1600947313",
    },
    {
      added_at: "2022-04-23T06:59:34.052Z",
      _id: "6263a3e538fd8c30a7c4d8b8",
      name: "BUSD Token",
      symbol: "BUSD",
      address: "0x84a73728582591a1aa90a25a07f4f636331d6c1e",
      chainId: 97,
      decimals: 18,
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png",
      active: true,
      __v: 0,
    },
    {
      added_at: "2022-04-23T06:59:34.052Z",
      _id: "63246e6eaa980102011a42d1",
      name: "Polkabridge",
      symbol: "PBR",
      address: "0xcdc22234e41a94ef3c028e0208b0f55cb63a3008",
      chainId: 97,
      decimals: 18,
      __v: 0,
      logo: "https://assets.coingecko.com/coins/images/13744/small/symbol-whitebg200x200.png?1611377553",
      active: true,
    },
  ],
};

export const TRADE_EVENTS = {
  buyer_joined: "buyer_joined",
  seller_joined: "seller_joined",
  seller_transfered: "seller_transfered",
  buyer_paid: "buyer_paid",
};
