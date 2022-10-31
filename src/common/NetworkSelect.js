import React, { useCallback } from "react";
import { DAPP_SUPPORTED_ON_CHAINS, FALLBACK_DEFAULT_CHAIN } from "../constants";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { SET_USER_CHAIN } from "../actions/types";
import { useUserAuthentication } from "../hooks/useUserAuthentication";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
  },
  imgIcon: {
    height: 18,
  },
  buttonDrop: {
    display: "flex",
    justifyContent: "space-between",
    color: "black",

    backgroundColor: "#efefef",
    "&:hover": {
      backgroundColor: "grey",
      color: "#100525",
    },
  },
  dropdown: {
    backgroundColor: "#efefef",
    padding: "6px 0px 3px 12px",
    color: "white",
    border: "1px solid #6A55EA",
    borderRadius: 10,

    border: "none",
  },
  networkName: {},
}));

const NetworkSelect = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userSelectedChain = useSelector((state) => state?.user?.chainId);
  const { logout } = useUserAuthentication();

  // const handleChainSelection = useCallback((chain) => {
  //   console.log("select chain", chain);
  //   dispatch({ type: SET_USER_CHAIN, payload: parseInt(chain) });
  //   localStorage.userSelectedChain = chain;
  //   logout();
  // }, []);

  return (
    <Box display="flex" alignItems="center">
      <FormControl
        className={classes.root}
        size="small"
        style={{ marginRight: 7 }}
      >
        <Select
          variant="standard"
          className={classes.dropdown}
          value={DAPP_SUPPORTED_ON_CHAINS[0]}
          disableUnderline={true}
          disabled={true}
          notched={false}
          sx={{ fontWeight: 500, fontSize: 14 }}
          id="adornment-weight"

          // onChange={({ target: { value } }) => handleChainSelection(value)}
        >
          <MenuItem
            value={DAPP_SUPPORTED_ON_CHAINS[0]}
            className={classes.buttonDrop}
            selected={true}
          >
            <span style={{ fontSize: 14, marginRight: 5 }}>Polygon</span>
            <img
              className={classes.imgIcon}
              src={
                "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png"
              }
            />
          </MenuItem>
          {/* <MenuItem
            value={DAPP_SUPPORTED_ON_CHAINS[1]}
            className={classes.buttonDrop}
          >
            <span style={{ fontSize: 14 }}>BSC</span>
            <img
              className={classes.imgIcon}
              src={
                "https://assets.coingecko.com/coins/images/12591/small/binance-coin-logo.png?1600947313"
              }
            />
          </MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
};

export default NetworkSelect;
