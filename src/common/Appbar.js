import {
  Box,
  Typography,
  ListItem,
  List,
  AppBar,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  Hidden,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { connect, useDispatch } from "react-redux";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import clsx from "clsx";
import { Menu } from "@mui/icons-material";
import AlertPopup from "./AlertPopup";
import WalletButton from "./WalletButton";
import { useInternet } from "../hooks/useInternet";
import NetworkSelect from "./NetworkSelect";
import TradePopup from "./popups/TradePopup";

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
  connectedButton: {
    marginLeft: 7,
    color: "white",
    padding: "7px 13px 7px 13px",
    backgroundColor: theme.palette.primary.light,
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 14,

    [theme.breakpoints.down("sm")]: {
      marginRight: 0,

      width: "fit-content",
      padding: "7px 5px 7px 10px",
    },
  },
  linkItems: {
    paddingRight: 20,
    paddingTop: 7,
    fontWeight: 600,
    paddingLeft: 15,
    fontSize: 15,
    display: "none",
    [theme.breakpoints.down("xl")]: {
      display: "block",
      paddingRight: 12,
    },
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
    fontSize: 15,
    "&:hover": {
      background: theme.palette.primary.hover,
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginLeft: 15,
      width: 150,
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
      width: "fit-content",
      padding: "4px 10px 4px 10px",
    },
  },
  numbers: {
    color: "#f9f9f9",
    fontSize: 14,
  },
  grow: {
    flexGrow: 1,
  },
  menuTitle: {
    paddingLeft: 20,
    fontWeight: 500,
    verticalAlign: "baseline",
    letterSpacing: "-0.4px",
    textAlign: "left",
    fontSize: 17,
    color: "black",
    textDecoration: "none",
  },
  list: {
    width: 200,
  },
}));

const Appbar = () => {
  const classes = useStyles();
  // const authenticatedUser = useSelector((state) => state?.user);
  // const userChainId = useSelector((state) => state?.user?.chainId);
  // const userFiat = useSelector((state) => state?.user?.userFiat);
  // const authError = useSelector((state) => state?.user?.authError);
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ paddingTop: 30 }}>
        {[
          // { name: "Create Order", to: "/create-order" },
          // { name: "My Orders", to: "/my-orders" },
          // { name: "My Profile", to: "/profile" },
          // { name: "My Wallet", to: "/wallet" },
          // { name: "Faucet", to: "/faucet" },
        ].map((tab, index) => (
          <Link
            activeClass="active"
            to={tab.to}
            smooth={true}
            offset={0}
            duration={500}
            delay={0}
            style={{ textDecoration: "none" }}
          >
            <ListItem
              button
              key={tab.name}
              onClick={toggleDrawer(anchor, false)}
              fontWeight={700}
            >
              <p primary={tab.name} className={classes.menuTitle}>
                {tab.name}
              </p>
            </ListItem>
          </Link>
        ))}{" "}
        <ListItem>
          <Box display="flex" alignItems="center">
            <a href="https://forms.gle/sp9t3J334ikjx39N8" target="_blank">
              <button className={classes.connectedButton}>
                {" "}
                Send Us Feedback
              </button>
            </a>
          </Box>
        </ListItem>
      </List>
    </div>
  );

  // TRADE POPUP STATES
  const initialPopupState = {
    open: false,
    event: null,
    message: "",
    tradeId: null,
  };
  const [tradePopup, setTradePopup] = useState(initialPopupState);

  // useEffect(() => {
  //   console.log("initial state load", { userChainId, userFiat });
  //   if (!userChainId || !userFiat) {
  //     return;
  //   }

  //   fetchGlobalData(userChainId, userFiat);
  // }, [userChainId, userFiat]);

  const { account, chainId } = useActiveWeb3React();

  useEffect(() => {
    if (!chainId) {
      return;
    }
    const cachedChain = localStorage.getItem("cachedChain");

    // console.log("chain changed ", { chainId, cachedChain });
    if (cachedChain && chainId?.toString() !== cachedChain) {
      localStorage.setItem("cachedChain", chainId?.toString());

      window.location.reload();
    } else if (!cachedChain) {
      localStorage.setItem("cachedChain", chainId?.toString());
    }
  }, [chainId, account]);

  useEffect(() => {
    if (!account) {
      return;
    }
    const cachedAccount = localStorage.getItem("cachedAccount");

    // console.log("chain changed ", { account, cachedAccount });
    if (cachedAccount && account?.toString() !== cachedAccount) {
      localStorage.setItem("cachedAccount", account?.toString());

      window.location.reload();
    } else if (!cachedAccount) {
      localStorage.setItem("cachedAccount", account?.toString());
    }
  }, [account]);

  const initalSnackObjectState = {
    open: false,
    message: "",
    isError: false,
    hash: null,
    severity: "error",
  };
  const [snackObject, setSnackObject] = useState(initalSnackObjectState);

  const internet = useInternet();
  // const isError = useMemo(() => {
  //   if (!authError && !profileError) {
  //     return false;
  //   }
  //   return true;
  // }, [authError, profileError]);
  // const currentError = authError || profileError;

  useEffect(() => {
    if (!internet) {
      setSnackObject({
        ...initalSnackObjectState,
        open: true,
        severity: "error",
        message: "Please check your network connection",
      });
    }

    if (internet && snackObject.open) {
      setSnackObject(initalSnackObjectState);
      return;
    }
  }, [internet]);

  const handlePopupClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackObject(initalSnackObjectState);
  };

  return (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        style={{
          marginTop: 10,
          background: "white",
          boxShadow: "none",
        }}
      >
        <AlertPopup
          message={snackObject.message}
          open={snackObject.open}
          severity={snackObject.severity}
          handlePopupClose={handlePopupClose}
        />
        <TradePopup
          handleClose={() => {}}
          open={tradePopup.open}
          message={tradePopup.message}
          tradeId={tradePopup?.tradeId}
          tradeEvent={tradePopup.event}
        />
        <Hidden lgDown>
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Typography className={classes.title} variant="h6" noWrap>
              <Box display="flex">
                <Link to="/">
                  <img src="/logoTest.png" alt="logo" height="40px" />
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    className={classes.linkItems}
                    style={{
                      color: "black",
                    }}
                  >
                    Trade
                  </Typography>
                </Link>
                <Link to="/create-order" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.linkItems}
                    style={{
                      color: "black",
                    }}
                  >
                    Pools
                  </Typography>
                </Link>
              </Box>
            </Typography>
            <div className="d-flex justify-content-start">
              {/* 
              <Link to="/my-orders" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.linkItems}
                  style={{
                    color: "black",
                  }}
                >
                  My Orders
                </Typography>
              </Link>
              <Link to="/wallet" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.linkItems}
                  style={{
                    color: "black",
                  }}
                >
                  My Wallet
                </Typography>
              </Link>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.linkItems}
                  style={{
                    color: "black",
                  }}
                >
                  Profile
                </Typography>
              </Link>
              <Link to="/faucet" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.linkItems}
                  style={{
                    color: "black",
                  }}
                >
                  Faucet
                </Typography>
              </Link> */}
              <NetworkSelect />
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <WalletButton initHooks={true} />
              </Box>
            </div>
          </Box>
        </Hidden>
        <Hidden lgUp>
          <Toolbar className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <Link to="/">
                <img src="/polkabridge.png" alt="logo" height="50px" />
              </Link>
            </div>

            <div className="d-flex justify-content-end">
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <WalletButton initHooks={true} />
              </Box>
              {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <IconButton
                    aria-label="Menu"
                    aria-haspopup="true"
                    className={classes.menuIcon}
                    onClick={toggleDrawer(anchor, true)}
                  >
                    <Menu />
                  </IconButton>

                  <SwipeableDrawer
                    anchor={anchor}
                    disableSwipeToOpen={false}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                  >
                    {list(anchor)}
                  </SwipeableDrawer>
                </React.Fragment>
              ))}
            </div>
          </Toolbar>
        </Hidden>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(Appbar);
