import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransactionStatus, Token, TransactionState } from "../utils/interface";
import useActiveWeb3React from "./useActiveWeb3React";
import useBlockNumber, { useFastForwardBlockNumber } from "./useBlockNumber";
import { useFaucetContract } from "./useContract";

export function useClaimCallback(): {
  claimTokens: (tokenAddress: string) => {};
  resetTrxState: () => void;
  transactionStatus: TransactionStatus;
} {
  const { library, account, chainId } = useActiveWeb3React();
  const faucetContract = useFaucetContract();
  const initialState: TransactionStatus = {
    hash: "",
    status: null,
    state: 0,
    type: null,
  };
  const [data, setData] = useState<TransactionStatus>(initialState);
  const blockNumber = useBlockNumber();
  const fastFarwardBlockNumber = useFastForwardBlockNumber();
  const userAuth = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();

  const claimFaucet = useCallback(
    async (tokenAddress?: string) => {
      try {
        setData({
          ...data,
          status: TransactionState.WAITING,
          state: 1,
          type: "claim",
        });

        // console.log(tokenAddress);
        // console.log(faucetContract);
        const txResponse = await faucetContract?.claimTokens(tokenAddress);

        // console.log(txResponse);

        setData({
          ...data,
          hash: txResponse?.hash,
          status: TransactionState.PENDING,
          state: 2,
          type: "claim",
        });
      } catch (error) {
        setData({
          ...data,
          status: TransactionState.FAILED,
          state: 4,
          type: "claim",
        });

        console.log("depositTokens trx error ", { error });
      }
    },
    [faucetContract, data, setData]
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
          // update balance in transaction update
          setData({ ...data, status: TransactionState.COMPLETED, state: 3 });
          fastFarwardBlockNumber(res?.blockNumber);
        }
      })
      .catch((err) => {
        console.log("transaction failed ", err);
        setData({ ...data, status: TransactionState.FAILED, state: 4 });
      });
  }, [blockNumber]);

  const transactionStatus = useMemo(() => {
    return {
      status: data?.status,
      hash: data?.hash,
      state: data?.state,
      type: data?.type,
    };
  }, [data]);

  return {
    claimTokens: claimFaucet,
    resetTrxState: resetTrxState,
    transactionStatus: transactionStatus,
  };
}
