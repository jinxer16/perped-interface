import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import Web3 from "web3";
import { FALLBACK_DEFAULT_CHAIN } from "../constants";
import { INFURA_NETWORK_URLS } from "./infura";

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// account is not optional
function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  );
}


const getReadOnlyWeb3Provider = (chainId:number | undefined) => {

  // rpc mappings for read contracts
  const rpc:{ [index: string]: string } = {
      1: INFURA_NETWORK_URLS[1],
      4: INFURA_NETWORK_URLS[4],
      56: INFURA_NETWORK_URLS[56],
      97: INFURA_NETWORK_URLS[97]
  }
  console.log('rpc ', {rpc:rpc?.[ FALLBACK_DEFAULT_CHAIN ]})

  const provider = new Web3.providers.HttpProvider(rpc?.[ FALLBACK_DEFAULT_CHAIN ]);
  const web3 = new Web3(provider);
  return web3;
};


export function getReadOnlyContractInstance(address:string, ABI: any, chainId: number | undefined) {
  const web3 = getReadOnlyWeb3Provider(chainId);
  const instance = new web3.eth.Contract(ABI, address);
  return instance;
}