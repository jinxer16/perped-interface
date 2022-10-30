import { useCallback, useEffect, useMemo, useState } from "react";
import { useSingleCallResult } from "../state/multicall/hooks";
import { useTokenContract } from "./useContract";
import { Token, TransactionState, TransactionStatus } from "../utils/interface";
import { BigNumber } from "@ethersproject/bignumber";
import { FALLBACK_DEFAULT_CHAIN, P2P_ADDRESSES } from "../constants";
import useBlockNumber from "./useBlockNumber";
import { toWei } from "../utils/helper";
import useActiveWeb3React from "./useActiveWeb3React";
import { NATIVE_TOKEN } from "../constants/chains";

export function useTokenAllowance(
  token?: Token
): [boolean, () => {}, TransactionStatus, () => void] {
  const tokenContract = useTokenContract(token?.address);
  const initialState: TransactionStatus = {
    hash: "",
    status: null,
    state: 0,
    type: null,
  };
  const [data, setData] = useState(initialState);
  const blockNumber = useBlockNumber();
  const { account, chainId, library } = useActiveWeb3React();

  const owner = account;
  const spender = P2P_ADDRESSES?.[chainId || FALLBACK_DEFAULT_CHAIN];

  const inputs = useMemo(
    () => [owner?.toLowerCase(), spender?.toLowerCase()],
    [owner, spender]
  );
  const allowance = useSingleCallResult(
    tokenContract,
    "allowance",
    inputs
  ).result;

  const confirmAllowance = useCallback(
    async (tokenAmount?: string) => {
      try {
        const _amount = toWei(tokenAmount, token?.decimals);
        console.log("allowance ", _amount);
        setData({
          ...data,
          status: TransactionState.WAITING,
          state: 1,
          type: "allowance",
        });
        const tx = await tokenContract?.approve(spender, _amount);

        setData({
          ...data,
          hash: tx?.hash,
          status: TransactionState.PENDING,
          state: 2,
        });
      } catch (error) {
        console.log("confirmAllowance  ", error);
        setData({ ...data, status: TransactionState.FAILED, state: 4 });
      }
    },
    [tokenContract, setData]
  );

  const resetTrxState = useCallback(() => {
    setData(initialState);
  }, [setData, data]);

  useEffect(() => {
    setData(initialState);
  }, []);

  useEffect(() => {
    if (!data?.hash) {
      return;
    }

    if (
      data?.status === TransactionState.COMPLETED ||
      data?.status === TransactionState.FAILED
    ) {
      return;
    }

    library
      ?.getTransactionReceipt(data?.hash)
      .then((res) => {
        if (res?.blockHash && res?.blockNumber) {
          setData({ ...data, status: TransactionState.COMPLETED, state: 3 });
        }
      })
      .catch((err) => {
        console.log("transaction failed ", err);
        setData({ ...data, status: TransactionState.FAILED, state: 4 });
      });
  }, [blockNumber]);

  const allowanceStatus = useMemo(() => {
    if (token && chainId && token?.symbol === NATIVE_TOKEN?.[chainId]) {
      return true;
    }

    if (token && allowance && BigNumber.from(allowance?.toString()).gt(0)) {
      return true;
    }

    return false;
  }, [token, allowance, blockNumber, chainId]);

  const transactionStatus = useMemo(() => {
    return {
      status: data?.status,
      hash: data?.hash,
      state: data.state,
      type: data?.type,
    };
  }, [data]);

  return [allowanceStatus, confirmAllowance, transactionStatus, resetTrxState];
}
