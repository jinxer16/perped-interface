import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import connectors from "../connections/connectors";
import { CONNECTOR_TYPE } from "../constants";
import useActiveWeb3React from "./useActiveWeb3React";
import { WalletConnectConnector } from "web3-react-walletconnect-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";

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
        console.log("wallet connection error", { error });
      }
    },
    [createConnectHandler, dispatch]
  );

  const logout = useCallback(async () => {
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

  return {
    connectWallet: connectWallet,
    logout: logout,
  };
}
