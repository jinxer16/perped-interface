import {
  Settings,
  SwapVerticalCircleOutlined,
  SwapVerticalCircleSharp,
} from "@mui/icons-material";
import { Box, Button, Card, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TradeInfo from "./TradeInfo";
import TradeInputGroup from "./TradeInputGroup";
import useSWR from "swr";
import { getTokenPriceFromCoinGecko } from "../../utils/helper";
import { getEntryPrice } from "../../actions/tradeAction";
import { getLiquidationPrice } from "../../utils/tradeUtils";
import { bigNumberify } from "../../utils/number";
import { getUsd } from "../../utils/tokenUtils";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "96%",
    maxWidth: 500,
    borderRadius: 30,
    boxShadow: `rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px`,
    backgroundColor: theme.palette.primary.bgCard,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 7,
      paddingRight: 7,
      width: "96%",
    },
  },
  cardContents: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardHeading: {
    width: "95%",
    paddingBottom: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  settingIcon: {
    color: theme.palette.primary.iconColor,
    fontSize: 22,
    cursor: "pointer",
    transition: "all 0.4s ease",
    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
    },
  },
  iconButton: {
    margin: 0,
    padding: 2,
    backgroundColor: theme.palette.primary.iconBack,
    borderRadius: "30%",
  },
  swapIcon: {
    color: theme.palette.primary.iconColor,
    marginTop: -12,
    marginBottom: -12,
    borderRadius: "36%",
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: theme.palette.primary.iconBack,
    transition: "all 0.4s ease",
    fontSize: 28,
    backgroundColor: theme.palette.primary.iconBack,
  },
  swapButton: {
    marginTop: 30,
    backgroundColor: theme.palette.primary.main,
    color: "white",
    width: "95%",
    textTransform: "none",
    fontSize: 19,
    borderRadius: 20,
    willChange: "transform",
    transition: "transform 450ms ease 0s",
    transform: "perspective(1px) translateZ(0px)",
    padding: "12px 50px 12px 50px",
    "&:hover": {
      background: "rgba(224, 7, 125, 0.7)",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },

  rotate1: {
    transform: "rotateZ(0deg)",
  },
  rotate2: {
    transform: "rotateZ(-180deg)",
  },
  priceRatio: {
    display: "flex",
    width: "70%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
  },
  tokenPrice: {
    color: theme.palette.textColors.heading,
    textAlign: "right",
    width: 430,
    fontSize: 13,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  infoIcon: {
    color: "white",
    fontSize: 16,
    color: "#bdbdbd",
  },
  txDetailsCard: {
    backgroundColor: "black",
    height: "100%",
    width: 320,
    borderRadius: 10,
    marginTop: 5,
    padding: 14,
    color: "#bdbdbd",
    fontSize: 12,
  },

  txDetailsValue: {
    color: "#ffffff",
    fontSize: 14,
    paddingBottom: 5,
  },
  heading: {
    color: theme.palette.textColors.heading,
    letterSpacing: -0.7,
    fontSize: 18,
    fontWeight: 500,
  },
  certikLabel: {
    textAlign: "center",
    color: theme.palette.primary.iconColor,
    fontWeight: 600,
    fontSize: 14,
    paddingTop: 3,
    // marginBottom: 4,
  },
  ankrLabel: {
    textAlign: "center",
    color: theme.palette.primary.iconColor,
    fontSize: 12,
    paddingTop: 3,
  },
  hackenLabel: {
    textAlign: "center",
    color: "#50DDA0",
    fontSize: 12,
    paddingTop: 3,
  },
  icon: {
    width: 25,
    height: "100%",
  },
}));

export default function Trade() {
  const classes = useStyles();
  const [selectedToken1, setToken1] = useState({});

  const [selectedToken2, setToken2] = useState({});
  const [token1Value, setToken1Value] = useState("");
  const [token2Value, setToken2Value] = useState("");

  const dispatch = useDispatch();

  const tokens = useSelector((state) => state?.list.tokens);

  const onToken1Select = async (token) => {
    setToken1(token);
  };

  const onToken2Select = (token) => {
    setToken2(token);
  };

  const handleSwapInputs = () => {
    const tokenSelected1 = selectedToken1;
    setToken1(selectedToken2);
    setToken2(tokenSelected1);
  };
  // token 1 input change
  const onToken1InputChange = async (tokens) => {
    setToken1Value(tokens);

    // let _swapFn = swapFnConstants.swapExactETHForTokens;
    // if (selectedToken0.symbol === NATIVE_TOKEN?.[chainId]) {
    //   _swapFn = swapFnConstants.swapExactETHForTokens;
    // } else if (
    //   selectedToken1.symbol &&
    //   selectedToken1.symbol === NATIVE_TOKEN?.[chainId]
    // ) {
    //   _swapFn = swapFnConstants.swapExactTokensForETH;
    // } else {
    //   _swapFn = swapFnConstants.swapExactTokensForTokens;
    // }

    // setCurrentSwapFn({
    //   tradeType: swapFnConstants.swapExactIn,
    //   swapFn: _swapFn,
    // });
  };

  // token2 input change
  const onToken2InputChange = async (tokens) => {
    setToken2Value(tokens);

    // let _swapFn = swapFnConstants.swapETHforExactTokens;
    // if (selectedToken0.symbol === NATIVE_TOKEN?.[chainId]) {
    //   _swapFn = swapFnConstants.swapETHforExactTokens;
    // } else if (
    //   selectedToken1.symbol &&
    //   selectedToken1.symbol === NATIVE_TOKEN?.[chainId]
    // ) {
    //   _swapFn = swapFnConstants.swapTokensForExactETH;
    // } else {
    //   _swapFn = swapFnConstants.swapTokensForExactTokens;
    // }

    // setCurrentSwapFn({
    //   tradeType: swapFnConstants.swapExactOut,
    //   swapFn: _swapFn,
    // });
  };

  // fetch entry price from coingecko

  useEffect(() => {
    if (!selectedToken2?.symbol) {
      return;
    }

    dispatch(getEntryPrice(selectedToken2));
  }, [selectedToken2]);

  useEffect(() => {
    if (tokens?.length === 0) {
      return;
    }
    console.log("tokens loaded ", tokens);
    setToken1(tokens?.[0]);
    setToken2(tokens?.[1]);
  }, [tokens]);

  //:todo fix 1
  const toUsdMax = getUsd(
    toAmount,
    toTokenAddress,
    true,
    infoTokens,
    orderOption,
    triggerPriceUsd
  );

  const existingPosition = undefined; //: setup existing position setup
  const hasExistingPosition = false;

  const liquidationPrice = getLiquidationPrice({
    isLong,
    size: hasExistingPosition ? existingPosition.size : bigNumberify(0),
    collateral: hasExistingPosition
      ? existingPosition.collateral
      : bigNumberify(0),
    averagePrice: nextAveragePrice,
    entryFundingRate: hasExistingPosition
      ? existingPosition.entryFundingRate
      : bigNumberify(0),
    cumulativeFundingRate: hasExistingPosition
      ? existingPosition.cumulativeFundingRate
      : bigNumberify(0),
    sizeDelta: toUsdMax,
    collateralDelta: fromUsdMin,
    increaseCollateral: true,
    increaseSize: true,
  });

  return (
    <Card elevation={20} className={classes.card}>
      <div className={classes.cardContents}>
        <div className={classes.cardHeading}>
          <h6 className={classes.heading}>Trade </h6>
          <IconButton className={classes.iconButton}>
            <Settings
              fontSize="default"
              //   onClick={handleSettings}
              className={classes.settingIcon}
            />
          </IconButton>
        </div>

        <TradeInputGroup
          inputType="Pay"
          onInputChange={onToken1InputChange}
          onTokenChange={onToken1Select}
          currentToken={selectedToken1}
          disableToken={selectedToken2}
          inputValue={token1Value}
          priceUSD={"0.0"}
          currenryBalance={"0.0"}
        />

        <IconButton className={classes.iconButton}>
          {" "}
          <SwapVerticalCircleSharp
            fontSize="large"
            color="primary"
            // className={[
            //   classes.swapIcon,
            //   rotate ? classes.rotate1 : classes.rotate2,
            // ].join(" ")}
            onClick={handleSwapInputs}
          />
        </IconButton>
        <TradeInputGroup
          inputType="Long"
          onInputChange={onToken2InputChange}
          onTokenChange={onToken2Select}
          currentToken={selectedToken2}
          disableToken={selectedToken1}
          inputValue={token2Value}
          priceUSD={"0.0"}
          currenryBalance={"0.0"}
        />

        <Box width={"90%"} mt={1} mb={1}>
          <TradeInfo />
        </Box>

        <Button className={classes.swapButton} onClick={() => {}}>
          Open Long
        </Button>
      </div>
    </Card>
  );
}
