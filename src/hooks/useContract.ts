import { Contract } from "@ethersproject/contracts";
import { useMemo } from "react";
import { getContract } from "../utils/contractUtils";
import MulticallABI from "../contracts/abi/multicall.json";
import useActiveWeb3React from "./useActiveWeb3React";
import ERC20_ABI from "../contracts/abi/erc20.json";
import { FALLBACK_DEFAULT_CHAIN, Pool, Router, Treasury } from "../constants";
import ROUTER_ABI from "../contracts/abi/router.json";
import TREASURY_ABI from "../contracts/abi/treasury.json";
import POOL_ABI from "../contracts/abi/pool.json";

import { MULTICALL_ADDRESS } from "../constants/chains";

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [
    addressOrAddressMap,
    ABI,
    library,
    chainId,
    withSignerIfPossible,
    account,
  ]) as T;
}

export function useInterfaceMulticall(): Contract | null {
  const { chainId } = useActiveWeb3React();

  return useContract(
    MULTICALL_ADDRESS?.[chainId || FALLBACK_DEFAULT_CHAIN],
    MulticallABI,
    false
  );
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useRouterContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();

  return useContract(Router, ROUTER_ABI, withSignerIfPossible);
}

export function useTreasuryContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();

  return useContract(Treasury, TREASURY_ABI, withSignerIfPossible);
}

export function usePoolContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();

  return useContract(Pool, POOL_ABI, withSignerIfPossible);
}
