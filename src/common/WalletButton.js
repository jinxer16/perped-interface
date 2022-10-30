import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  CONNECTOR_TYPE,
  DAPP_SUPPORTED_ON_CHAINS,
  FALLBACK_DEFAULT_CHAIN,
  NATIVE_TOKENS,
  NETWORK_TYPE,
} from "../constants";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { useCurrencyBalance } from "../hooks/useBalance";
import { useUserAuthentication } from "../hooks/useUserAuthentication";
import { makeStyles } from "@mui/styles";
import {
  formatCurrency,
  fromWei,
  isMetaMaskInstalled,
  setupNetwork,
} from "../utils/helper";
import { NETWORK_DETAILS } from "../constants/chains";
import { CellTower } from "@mui/icons-material";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    backgroundColor: "transparent",
  },
  linkItems: {
    paddingRight: 20,
    paddingTop: 7,
    fontWeight: 600,
    paddingLeft: 15,
    fontSize: 15,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  logo: {
    height: 55,
  },
  paper: {
    top: "67px !important",
    left: "unset !important",
    right: "0 !important",
    width: "45%",
    borderRadius: "0",
    backgroundColor: "black",
    transformOrigin: "16px -1px !important",
  },
  listItem: {
    justifyContent: "center",
  },
  navbarButton: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: "7px 18px 7px 18px",
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 14,
    "&:hover": {
      background: theme.palette.primary.hover,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      marginRight: 0,
      marginLeft: 15,
      width: "fit-content",
    },
  },
  connectedButton: {
    color: "white",
    padding: "7px 5px 7px 10px",
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 14,
    minWidth: 200,
    width: "fit-content",
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      fontSize: 12,

      minWidth: 10,
      width: "fit-content",
      padding: "7px 5px 7px 10px",
    },
  },
  connectedAddress: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    padding: "4px 18px 4px 18px",
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 15,

    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginLeft: 5,
      fontSize: 12,

      width: "fit-content",
      padding: "4px 10px 4px 10px",
    },
  },
  balanceText: {
    color: "#212121",
    height: "100%",
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: "-0.02em",
    color: "#414141",
    textAlign: "center",
    lineHeight: 1.5,
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginLeft: 5,
      fontSize: 12,
      width: "fit-content",
      padding: "4px 5px 4px 5px",
    },
  },
}));

export default function WalletButton({ initHooks = false }) {
  const classes = useStyles();
  const authLoading = useSelector((state) => state?.user?.authLoading);
  const authenticated = useSelector((state) => state?.user?.authenticated);
  const { connectWallet } = useUserAuthentication(initHooks);

  const userSelectedChain = useSelector((state) => state?.user?.chainId);

  const handleConnectWallet = useCallback(() => {
    if (isMetaMaskInstalled()) {
      connectWallet(CONNECTOR_TYPE.injected);
    } else {
      connectWallet(CONNECTOR_TYPE.walletConnect);
    }
  }, [connectWallet]);

  const { account, chainId, active } = useActiveWeb3React();
  const balance = useCurrencyBalance(
    account,
    NATIVE_TOKENS[chainId ?? FALLBACK_DEFAULT_CHAIN]
  );

  const isDappSupported = useMemo(() => {
    if (!chainId) {
      return false;
    }

    if (userSelectedChain !== chainId) {
      return false;
    }

    const support = DAPP_SUPPORTED_ON_CHAINS.includes(chainId);
    return support;
  }, [chainId, userSelectedChain]);

  const isNetworkSwitchRequired = useMemo(() => {
    if (active && !isDappSupported && !authLoading) {
      return true;
    }

    return false;
  }, [active, isDappSupported, authLoading]);

  const isConnectionRequired = useMemo(() => {
    console.log("checks isConnectionRequired", active);
    if (!active && !authLoading) {
      return true;
    }

    return false;
  }, [active, authLoading]);

  // useEffect(() => {
  //   // console.log("connection test  ", {
  //   //   isConnectionRequired,
  //   //   isNetworkSwitchRequired,
  //   //   isDappSupported,
  //   // });
  // }, [isConnectionRequired, isNetworkSwitchRequired, isDappSupported]);

  const handleSwitchNetwork = useCallback(() => {
    // if (userSelectedChain === DAPP_SUPPORTED_ON_CHAINS[0]) {
    // }
    setupNetwork(NETWORK_DETAILS.POLYGON);
  }, [setupNetwork, userSelectedChain]);

  return (
    <div>
      {account && active && !authLoading && (
        <Link to="#">
          <button onClick={null} className={classes.connectedButton}>
            <span className={classes.balanceText}>
              {balance &&
                formatCurrency(fromWei(balance?.toString(), 18)) +
                  NATIVE_TOKENS?.[chainId]?.symbol}
            </span>{" "}
            {account && window.innerWidth > 500 && (
              <span className={classes.connectedAddress}>
                {[...account].splice(0, 2)}
                {"..."}
                {[...account].splice([...account].length - 5, 5)}
              </span>
            )}
            {account && window.innerWidth < 500 && (
              <span className={classes.connectedAddress}>
                {"..."}
                {[...account].splice([...account].length - 5, 5)}
              </span>
            )}
          </button>
        </Link>
      )}

      {!active && (
        <button className={classes.navbarButton} onClick={handleConnectWallet}>
          {window.innerWidth < 500 ? "Connect" : "Connect Wallet"}
        </button>
      )}
      {/* {authLoading && (
        <button
          className={classes.navbarButton}
          disabled={true}
          // onClick={handleConnectWallet}
        >
          {window.innerWidth < 500 ? "Auth..." : "Authenticating..."}
        </button>
      )} */}

      {/* {isNetworkSwitchRequired && (
        <button className={classes.navbarButton} onClick={handleSwitchNetwork}>
          <CellTower />{" "}
          {window.innerWidth < 500 ? "Switch" : "Switch to Polygon"}
        </button>
      )} */}
    </div>
  );
}
