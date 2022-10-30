import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Close,
  RadioButtonCheckedRounded,
  SwapHoriz,
} from "@mui/icons-material";
import {
  useMediaQuery,
  useTheme,
  Typography,
  Box,
  IconButton,
  Checkbox,
} from "@mui/material";
import TimerCountDown from "../../pages/Orders/OrderTransaction/TimerCountDown";
import { fromWei, formatCurrency } from "../../utils/helper";

const useStyles = makeStyles((theme) => ({
  background: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    display: "grid",
    placeItems: "center",
    background: "rgba(0,0,0,0.2)",
  },
  container: {
    width: "100%",
    maxWidth: 788,
    position: "relative",
    background: "linear-gradient(180deg, #FFFFFF 0%, #D9E8FC 100%)",
    border: "10px solid #6A55EA",
    padding: 8,
    borderRadius: 4,
    zIndex: 11,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      maxWidth: "95%",
    },
  },
  inputWrapper: {
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  input: {
    backgroundColor: "#ffffff",
    border: "1px solid #757575",
    borderRadius: 18,
    width: "80%",
    padding: 6,
    outline: "none",
    color: "#212121",
    textAlign: "left",
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    fontFamily: "Karla",
  },
  heading: {
    color: "#212121",
    fontWeight: 700,
    fontSize: 26,
    paddingRight: 20,
    letterSpacing: "0.01em",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: 22,
      paddingRight: 10,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      paddingRight: 10,
    },
  },

  para: {
    color: "#919191",
    letterSpacing: 1,
    textAlign: "center",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.5,
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
    },
  },

  connectButton: {
    width: "fit-content",
    height: "45px",
    background: "#6A55EA",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "10px",
    fontSize: 16,
    lineHeight: "33px",
    color: "#ffffff",
    fontWeight: 700,
    marginTop: 20,
    padding: "12px 50px 12px 50px",
    "&:hover": {
      background: "#FFB469",
    },
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
  svgImage: {
    width: "100%",
    height: "fit-content",
    maxHeight: 250,
    objectFit: "contain",
    [theme.breakpoints.down("md")]: {
      maxHeight: 120,
    },
  },
  iconWrapper: {
    marginRight: 10,
    backgroundColor: "#FF87FF",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
  },
  icon: {
    width: 25,
    height: 25,
    color: "white",
  },
  cautionTextBox: {
    background: "rgba(250, 173, 20, 0.1)",
    border: " 1px solid #FAAD14",
    borderRadius: "5px",
    padding: 10,
    width: "90%",
  },
  roundedBox: {
    background: "rgba(189, 180, 241, 0.6)",
    display: "flex",
    padding: 15,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
    cursor: "pointer",

    [theme.breakpoints.down("sm")]: {
      padding: 10,
    },
  },
  blueButton: {
    backgroundColor: "#6A55EA",
    border: `1px solid #6A55EA`,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 17,
    textDecoration: "none",
    color: "#fff",
  },
  whiteButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: 17,
    textDecoration: "none",
    color: "#6A55EA",
    "&button:hover": {
      color: "red",
    },
  },
  iconContainer: {
    "&:hover $icon": {
      cursor: "hand",
    },
    padding: 0,
    margin: 0,
  },
}));

const ConfirmPopup = ({
  resetPopup,
  message,
  paymentOption,
  paymentOptionFields,
  pendingTrade,
  action,
  transactionType,
}) => {
  const [isSelect, setSelect] = useState(true);

  const handleSelect = () => {
    setSelect(!isSelect);
  };

  const isTrx = useMemo(() => {
    if (transactionType === "buy") {
      return true;
    }
    return false;
  }, [transactionType]);

  const handleConfirm = () => {
    // action;
    resetPopup();
    action();
  };

  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <div className="d-flex justify-content-end">
          <Close
            style={{ color: "#212121", fontSize: 28 }}
            onClick={resetPopup}
          />
        </div>
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <Box className={classes.heading}>Confirm Transfer</Box>
          <TimerCountDown
            color={"#919191"}
            createdAt={pendingTrade?.created_at}
          />
        </div>
        <Box display="flex" justifyContent="center" pt={sm ? 1 : 2}>
          <Box className={classes.cautionTextBox}>
            <Typography
              textAlign="center"
              fontSize={sm ? 13 : 16}
              color={"#919191"}
              fontWeight={sm ? 400 : 500}
            >
              P2P transactions require that you make payment or transfer in a
              method that is supported by the receiving party. PolkaBridge does
              not automatically deduct from your account.
            </Typography>
          </Box>
        </Box>

        <Box
          pt={4}
          display="flex"
          w="100%"
          justifyContent="space-around"
          alignItems="center"
        >
          <Box textAlign="center">
            <Typography
              fontSize={sm ? 13 : 18}
              fontWeight={sm ? 400 : 600}
              color={"#919191"}
            >
              Transfer Amount
            </Typography>
            <Typography
              variant="h6"
              fontWeight={600}
              fontSize={sm ? 22 : 25}
              paddingTop={1}
              color={"#919191"}
            >
              {`${formatCurrency(pendingTrade?.fiat_amount)} ${
                pendingTrade?.order?.fiat?.fiat
              }`}
            </Typography>
          </Box>
          <div className="">
            <SwapHoriz sx={{ color: "#6A55EA", fontSize: sm ? 40 : 50 }} />
          </div>
          <Box textAlign="center">
            <Typography
              fontSize={sm ? 13 : 18}
              fontWeight={sm ? 400 : 600}
              color={"#919191"}
            >
              In exchange for
            </Typography>
            <Typography
              fontSize={sm ? 22 : 25}
              fontWeight={600}
              paddingTop={1}
              color={"#6A55EA"}
            >
              {`${formatCurrency(
                fromWei(
                  pendingTrade?.token_amount,
                  pendingTrade?.order?.token?.decimals
                )
              )} ${pendingTrade?.order?.token?.symbol}`}
            </Typography>
          </Box>
        </Box>
        <div className="pt-3">
          <Typography
            fontSize={sm ? 14 : 17}
            fontWeight={sm ? 400 : 600}
            color={"#919191"}
            textAlign="center"
          >
            Confirm the account of the receiving party
          </Typography>
        </div>
        <Box display="flex" justifyContent="center" pt={3}>
          <div className={classes.roundedBox} onClick={handleSelect}>
            <Box display="flex" alignItems="center" w="100%">
              <Checkbox size="small" checked={!isSelect} />
              <Box display="flex" flexDirection="column" ml={sm ? 0.5 : 2}>
                {paymentOptionFields?.map((field, index) => (
                  <Box display="flex" alignItems="center">
                    <Typography fontSize={sm ? 13 : 15} fontWeight={500} mr={1}>
                      {field?.label}:
                    </Typography>
                    <Typography
                      fontSize={sm ? 13 : 15}
                      fontWeight={500}
                      color={"#6A55EA"}
                    >
                      {paymentOption?.[field?.key]}
                    </Typography>
                  </Box>
                ))}
                <Box display="flex" alignItems="center">
                  <Typography fontSize={sm ? 13 : 15} fontWeight={500} mr={1}>
                    Email:
                  </Typography>
                  <Typography
                    fontSize={sm ? 13 : 15}
                    fontWeight={500}
                    color={"#6A55EA"}
                  >
                    {pendingTrade?.seller?.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </div>
        </Box>
        <div style={{ width: "90%", margin: "3px auto" }} className="pt-3">
          <Typography
            fontSize={sm ? 13 : 16}
            fontWeight={400}
            color={"#919191"}
            textAlign="center"
          >
            Please complete your orders as soon as possible so that the
            receiving party may confirm your transfer. Please select the account
            of the receiving party. Fraudulent payment confirmation will likely
            cause your account to be frozen
          </Typography>
        </div>
        <Box className="d-flex justify-content-center align-items-baseline pt-3">
          <div style={{ paddingRight: 10 }}>
            <button
              className={classes.whiteButton}
              onClick={resetPopup}
              style={{
                background: "transparent",
                borderRadius: 10,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: sm ? 15 : 20,
                paddingRight: sm ? 15 : 20,
                fontSize: sm ? 13 : 16,
                textDecoration: "none",
              }}
            >
              I didn't Pay Yet
            </button>
          </div>
          <div>
            <button
              onClick={handleConfirm}
              style={{
                background: isSelect ? "#bdbdbd" : "#6A55EA",
                border: isSelect ? "1px solid #BDBDBD" : `1px solid #6A55EA`,
                borderRadius: 10,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: sm ? 15 : 20,
                paddingRight: sm ? 15 : 20,
                fontSize: sm ? 13 : 16,
                textDecoration: "none",
                color: "#fff",
              }}
              disabled={isSelect}
            >
              Transfer Completed
            </button>
          </div>
        </Box>
        {/* <div
                    className="row flex-row align-items-center justify-content-center mb-sm-4"
                    align="center"
                    style={{
                        height: "75%",
                        width: "100%",
                        margin: "0 auto",
                    }}
                >
                    <div className="row">
                        <div className="col-md-6 my-auto">
                            <h4 className={classes.heading}>Sorry, You cannot Proceed!</h4>
                            <h6 className={classes.para}>

                            </h6>
                            <div className="text-center mt-5">
                                <h6 className={classes.para}>

                                    {message}


                                </h6>
                            </div>
                        </div>

                        <div className="col-md-6 my-auto">
                            <div className="text-center">

                            </div>
                        </div>
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default ConfirmPopup;
