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
  PRPD: {
    137: "0x3D172120313DfaC87D6F79d9e0cCF95D60C13Ad0",
  },
  fUSDC: {
    137: "0x2e0Dd1E3E578c8BC878D10D987315D9395513D99",
  },
};

export const Router = "0xa582f436C00016077c30Bef35b08273EabFF22d7";
export const Treasury = "0x39ec1C5902389De1A7Fa63258E2Bb9f67d35465c";
export const AirnodeRrpV0 = "0xf9da75Bd0a1e2c558Dc455CE2f14fd4Ab76f599e";
export const Requester = "0x9570850c50D710AbE49BA3069BBD3256DE48e58B";
export const TradingRRP = "0x5736eE63099ED08D209e218452aD9f4eDeB20Bc3";
export const Pool = "0xE37b4D84283B7F5588A5175AD40704d56d0D87De";
export const PoolUSDC = "0xbf935a95DE70060c35C765955C313c9fBeA7836f";
export const PoolPRPD = "0xBA20010488C3F860cB897056e991abf9D4bc4FB5";
export const PoolRewards = "0x018FeE5f66DF653F855D2DCcD1A2D2B164D6FaB2";
export const PoolRewardsUSDC = "0xC523784f200De514Df69EF1E25F278baD8145573";
export const PRPDRewards = "0x2b3BD150F69c241FBDfc407E76A16f8400244a20";
export const PRPDRewardsUSDC = "0x71beEeCA4B7Ad79e3b5B192c09F325E784Ccd430";

export const WETH_ADDRESS = {
  1: "",
  4: "0xc778417e063141139fce010982780140aa0cd5ab",
  5: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
  56: "",
  97: "0xae13d989dac2f0debff460ac112a837c89baa7cd", // bnb for bsc chain
};

export const CONNECTOR_TYPE = {
  injected: "injected",
  walletConnect: "walletConnect",
  unstoppable: "unstoppable",
};

export const NETWORK_TYPE = 1; // testing:1, mainnet:0

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
