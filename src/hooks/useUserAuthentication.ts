import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH_ERROR,
  AUTH_LOADING,
  LOAD_GUEST_USER,
  LOAD_USER,
  SET_USER_CHAIN,
} from "../actions/types";
import connectors from "../connections/connectors";
import {
  CONNECTOR_TYPE,
  DAPP_SUPPORTED_ON_CHAINS,
  FALLBACK_DEFAULT_CHAIN,
} from "../constants";
// import { BASE_API_ENDPOINT, getGuestUser, getUser } from "../utils/httpCalls";
import useActiveWeb3React from "./useActiveWeb3React";
import { WalletConnectConnector } from "web3-react-walletconnect-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { ethers } from "ethers";

export function useUserAuthentication(initHook = false): {
  connectWallet: () => {};
  logout: () => void;
} {
  const { chainId, active, deactivate, activate, account, error, library } =
    useActiveWeb3React();
  const userSelectedChain = useSelector((state: any) => state?.user?.chainId);

  const dispatch = useDispatch();

  const createConnectHandler = useCallback(
    async (connector: AbstractConnector) => {
      try {
        // const connector = connectors.injected;
        // if the connector is walletconnect and the user has already tried to connect, manually reset the connector

        if (connector instanceof WalletConnectConnector) {
          connector.walletConnectProvider = undefined;
        }

        await activate(connector);
        localStorage.connected = "yes";
      } catch (error) {
        console.error("createConnectHandler", error);
      }
    },
    [activate]
  );

  const connectWallet = useCallback(
    async (connectorType?: string | null) => {
      try {
        let connector;
        if (connectorType === CONNECTOR_TYPE.injected) {
          connector = connectors.injected;
        } else if (connectorType === CONNECTOR_TYPE.walletConnect) {
          connector = connectors.walletconnect;
        } else if (connectorType === CONNECTOR_TYPE.unstoppable) {
          connector = connectors.uauth;
        } else {
          connector = connectors.injected;
        }

        localStorage.connectorType = connectorType;

        createConnectHandler(connector);

        localStorage.log_out = undefined;
      } catch (error) {
        dispatch({
          type: AUTH_ERROR,
          payload: "Something went wrong while connecting with wallet",
        });
        console.log("wallet connection error", { error });
      }
    },
    [createConnectHandler, dispatch]
  );

  // const verifyUserWallet = useCallback(async () => {
  //   dispatch({ type: AUTH_LOADING });
  //   try {
  //     if (
  //       !active ||
  //       !account ||
  //       !(chainId && DAPP_SUPPORTED_ON_CHAINS.includes(chainId))
  //     ) {
  //       setupGuestUser();
  //       return;
  //     }

  //     if (userSelectedChain !== chainId) {
  //       setupGuestUser();
  //       return;
  //     }

  //     // check cached user status logged in before
  //     const user: any = await getUser(account, chainId, undefined);
  //     if (user?.status === 200 && user?.data?.wallet_address === account) {
  //       dispatch({
  //         type: LOAD_USER,
  //         payload: {
  //           jwtToken: localStorage.getItem(`${account}_${chainId}`),
  //           account,
  //           id: user?.data?._id,
  //           authenticated: true,
  //         },
  //       });
  //       return;
  //     }

  //     const messageToSign = process.env.REACT_APP_MESSAGE_TO_SIGN;
  //     if (!messageToSign) {
  //       setupGuestUser();
  //       dispatch({
  //         type: AUTH_ERROR,
  //         payload: "Invalid message to sign!",
  //       });
  //       return;
  //     }

  //     // todo: fix and update nonce
  //     const nonce = 123;

  //     const messageHashRes = await axios.get(
  //       `${BASE_API_ENDPOINT}/auth-apis/v1/getMessageHash/${chainId}/${account}/${nonce}}`
  //     );

  //     // console.log("messageHash", messageHashRes);

  //     if (messageHashRes.status !== 200) {
  //       setupGuestUser();
  //       dispatch({
  //         type: AUTH_ERROR,
  //         payload: "Failed to fetch message hash!",
  //       });
  //       return;
  //     }

  //     const messageHash = messageHashRes.data?.hash;

  //     if (!messageHash || !account) {
  //       setupGuestUser();
  //       dispatch({
  //         type: AUTH_ERROR,
  //         payload: "Failed to generate message hash!",
  //       });
  //       return;
  //     }

  //     const signer = library?.getSigner(0);
  //     const signature = await signer?.signMessage(
  //       ethers.utils.arrayify(messageHash)
  //     );

  //     if (!signature) {
  //       setupGuestUser();
  //       dispatch({
  //         type: AUTH_ERROR,
  //         payload: "Failed to sign signature from message hash!",
  //       });
  //       return;
  //     }

  //     const verifyObject = {
  //       nonce: nonce,
  //       account: account,
  //       signature,
  //       chainId: chainId,
  //     };

  //     const verify = await axios.post(
  //       `${BASE_API_ENDPOINT}/auth-apis/v1/signatureVerify`,
  //       verifyObject
  //     );

  //     console.log("jwt token ", verify);
  //     // verify user wallet from server and authenticate
  //     if (verify?.data?.verified === true) {
  //       const user: any = await getUser(
  //         account,
  //         chainId,
  //         verify?.data?.jwtToken
  //       );
  //       dispatch({
  //         type: LOAD_USER,
  //         payload: {
  //           jwtToken: verify?.data?.jwtToken,
  //           account,
  //           id: user?.data?._id,
  //           authenticated: true,
  //         },
  //       });
  //       localStorage.setItem(`${account}_${chainId}`, verify?.data?.jwtToken);
  //     } else {
  //       setupGuestUser();
  //       dispatch({
  //         type: AUTH_ERROR,
  //         payload: "Failed to sign signature from message hash!",
  //       });
  //     }
  //   } catch (error) {
  //     setupGuestUser();
  //     dispatch({ type: AUTH_ERROR, payload: "Signature verification failed!" });
  //     console.log("signed message error ", error);
  //   }
  // }, [dispatch, account, active, chainId, userSelectedChain]);

  // const setupGuestUser = async () => {
  //   try {
  //     const res: any = await getGuestUser();
  //     dispatch({
  //       type: LOAD_GUEST_USER,
  //       payload: {
  //         jwtToken: res?.data?.jwtToken,
  //         account: null,
  //         id: null,
  //         authenticated: false,
  //       },
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: AUTH_ERROR,
  //       payload: "Failed to setup guest user! please refresh and try again",
  //     });
  //   }
  // };

  const logout = useCallback(async () => {
    dispatch({ type: AUTH_LOADING });
    // await setupGuestUser();

    localStorage.log_out = account;
    deactivate();
    account && localStorage.removeItem(account);
  }, [dispatch, account]);

  useEffect(() => {
    if (!initHook) {
      return;
    }

    // if (!account && localStorage.log_out !== "undefined") {
    //   setupGuestUser();
    //   return;
    // }

    // if (active) {
    //   verifyUserWallet();
    // }

    if (!active && localStorage.log_out !== account) {
      connectWallet(localStorage.connector);
      return;
    }
  }, [active, account]);

  // user chain updates: cases to handle user authenticated on selected chain
  //1. user wallet connected and does not selected any chain, load chain from wallet connection
  //2. user wallet connected and user selected a chain: [ handle in authenticaion  ]
  //2.a. if selected chain and wallet chain same: load authenticated user
  //2.b if selected chain and wallet chain different allow user to switch chain to continue authentication
  //3. wallet not connected and user does not selected any chain. Load user on fallback default chain
  //4. wallet not connected and user selected a chain before. load user from cached selected chain
  useEffect(() => {
    // check to avoid duplicate hook initialization
    if (!initHook) {
      return;
    }

    const cachedSelectedChain = parseInt(localStorage.userSelectedChain ?? 0);

    if (!cachedSelectedChain) {
      dispatch({ type: SET_USER_CHAIN, payload: FALLBACK_DEFAULT_CHAIN });
    } else {
      dispatch({ type: SET_USER_CHAIN, payload: cachedSelectedChain });
    }
  }, []);

  // // test user selected chain
  // const cachedSelectedChain = parseInt(localStorage.userSelectedChain ?? 0);
  // useEffect(() => {
  //   console.log("userSelectedChain", {
  //     userSelectedChain,
  //     cachedSelectedChain,
  //   });
  // }, [userSelectedChain, cachedSelectedChain]);

  return {
    connectWallet: connectWallet,
    logout: logout,
  };
}
