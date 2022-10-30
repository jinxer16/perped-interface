import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, Typography } from "@mui/material";
import { useCurrencyBalance } from "../../hooks/useBalance";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { debounce, formatCurrency, fromWei, toWei } from "../../utils/helper";
import { ALLOWANCE_AMOUNT, NATIVE_TOKENS } from "../../constants";
import { useDepositCallback } from "../../hooks/useDepositCallback";
import { useTokenAllowance } from "../../hooks/useAllowance";
import PopupLayout from "./PopupLayout";
import TxPopup from "./TxPopup";
import { useDispatch, useSelector } from "react-redux";
import BigNumber from "bignumber.js";
import { TransactionState } from "../../utils/interface";

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
    height: "max-content",
    height: 400,
    minHeight: 350,
    maxWidth: 788,
    position: "relative",
    background: "linear-gradient(180deg, #FFFFFF 0%, #D9E8FC 100%)",
    border: "10px solid #6A55EA",
    padding: 10,
    borderRadius: 4,
    // zIndex: 11,
    [theme.breakpoints.down("md")]: {
      padding: "25px 5%",
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: "max-content",
    },
  },
  inputWrapper: {
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  input: {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: 7,
    width: "80%",
    maxWidth: 500,
    fontWeight: 600,
    padding: 6,
    outline: "none",
    color: "#212121",
    textAlign: "left",
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 24,
  },
  heading: {
    color: "#212121",
    fontWeight: 700,
    fontSize: 24,
    letterSpacing: "0.02em",
    textAlign: "center",
    marginBottom: 14,
    [theme.breakpoints.down("md")]: {
      paddingTop: 5,
      fontSize: 20,
    },
  },

  para: {
    color: "#212121",
    textAlign: "center",
    fontSize: 13,
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
    maxHeight: 220,
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
  inputGroup: {
    border: "1px solid #bdbdbd",
    background: "#D9E8FC",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    marginTop: 20,
    marginButtom: 20,
  },
}));

const DepositPopup = ({ id, state, token, handleClose }) => {
  const classes = useStyles();

  const [txStatus, setTxStatus] = useState(0);
  const [tokenInput, setTokenInput] = useState("");

  const { account, chainId } = useActiveWeb3React();
  const dispatch = useDispatch();

  const wallet = useSelector((state) => state?.wallet);
  const walletLoading = useSelector((state) => state?.wallet?.loading);
  const authenticatedUserToken = useSelector((state) => state?.user?.jwtToken);

  const tokenWithdrawQuote = useMemo(() => {
    // console.log("wallet test 2", wallet);
    if (!wallet?.withdrawQuote?.[token?._id]) {
      return {};
    }
    const quote = wallet?.withdrawQuote?.[token?._id];
    return quote;
  }, [wallet, token?._id]);

  const balance = useCurrencyBalance(
    account,
    token?.symbol === NATIVE_TOKENS?.[chainId]?.symbol
      ? NATIVE_TOKENS?.[chainId]
      : token
  );

  const [
    allowance,
    confirmAllowance,
    allowanceTrxStatus,
    resetAllwanceTrxState,
  ] = useTokenAllowance(token);

  const {
    depositTokens,
    resetTrxState,
    withdrawTokens,
    fetchWithdrawQuote,
    transactionStatus,
  } = useDepositCallback(token, token?._id, token?.wallet_id);

  // useEffect(() => {
  //   console.log("allowance status", allowanceTrxStatus);
  // }, [allowanceTrxStatus]);

  const debounceFetchQuote = React.useCallback(
    debounce(fetchWithdrawQuote, 1000),
    []
  );

  const handleInputChange = useCallback(
    async (inputValue) => {
      if (!token) {
        return;
      }
      setTokenInput(inputValue);

      if (state.type !== "withdraw") {
        return;
      }

      debounceFetchQuote(toWei(inputValue, token?.decimals), token?._id);
    },
    [tokenInput, setTokenInput, token, state]
  );

  const handleDeposit = useCallback(async () => {
    if (!tokenInput) {
      return;
    }

    depositTokens(toWei(tokenInput, token?.decimals));
  }, [tokenInput, token]);

  const handleWithdraw = useCallback(async () => {
    if (!tokenInput) {
      return;
    }
    withdrawTokens(toWei(tokenInput, token?.decimals));
  }, [tokenInput, token]);

  const handleConfirm = useCallback(() => {
    if (!state?.type) {
      return;
    }
    if (state?.type === "deposit") {
      if (!allowance) {
        confirmAllowance(ALLOWANCE_AMOUNT);
      } else {
        handleDeposit();
      }
    } else {
      handleWithdraw();
    }
  }, [state, handleWithdraw, handleDeposit, allowance]);

  const handleMax = useCallback(() => {
    if (state?.type === "deposit") {
      setTokenInput(fromWei(balance, token?.decimals));
    } else {
      setTokenInput(fromWei(token?.available_balance, token?.decimals));

      if (state.type !== "withdraw") {
        return;
      }

      debounceFetchQuote(token?.available_balance, token?._id);
    }
  }, [tokenInput, token, state, balance, setTokenInput]);

  const isMax = useMemo(() => {
    return fromWei(balance, token?.decimals) === tokenInput;
  }, [balance, token, tokenInput]);

  const handleModalClose = useCallback(() => {
    if (
      [3, 4].includes(allowanceTrxStatus.state) ||
      [3, 4].includes(transactionStatus.state)
    ) {
      resetTrxState();
      resetAllwanceTrxState();
    }

    setTimeout(() => {
      setTokenInput("");
    }, 300);
    handleClose();
  }, [
    resetAllwanceTrxState,
    resetTrxState,
    transactionStatus,
    allowanceTrxStatus,
  ]);

  const confirmBtnText = useMemo(() => {
    if (walletLoading) {
      return "Please wait...";
    }

    if (state?.type === "withdraw") {
      return "Available soon!";
    }

    if (!allowance && state?.type === "deposit") {
      return allowanceTrxStatus?.state > 0 ? "Approving..." : "Approve";
    }

    if (
      new BigNumber(balance).lt(toWei(tokenInput, token?.decimals)) &&
      state?.type === "deposit"
    ) {
      return "Insufficient funds!";
    }

    if (
      state?.type === "withdraw" &&
      new BigNumber(tokenWithdrawQuote?.final_withdraw_amount).lte(0)
    ) {
      return "Insufficient withdraw!";
    }

    if (
      new BigNumber(token?.available_balance).lt(
        toWei(tokenInput, token?.decimals)
      ) &&
      state?.type === "withdraw"
    ) {
      return "Insufficient funds!";
    }

    return state?.type === "deposit" ? "Confirm" : "Withdraw";
  }, [
    walletLoading,
    tokenInput,
    state,
    token,
    balance,
    allowance,
    allowanceTrxStatus,
    tokenWithdrawQuote,
  ]);

  const isConfirmDisabled = useMemo(() => {
    if (walletLoading || new BigNumber(tokenInput).lte(0)) {
      return true;
    }

    if (state?.type === "withdraw") {
      return true;
    }

    if (
      state?.type === "withdraw" &&
      new BigNumber(tokenWithdrawQuote?.final_withdraw_amount).lte(0)
    ) {
      return true;
    }

    if (state?.type === "withdraw") {
      return new BigNumber(token?.available_balance).lt(
        toWei(tokenInput, token?.decimals)
      );
    }

    if (!allowance && state?.type === "deposit") {
      return allowanceTrxStatus?.status === TransactionState.PENDING
        ? true
        : false;
    }

    return new BigNumber(balance).lt(toWei(tokenInput, token?.decimals));
  }, [
    walletLoading,
    tokenInput,
    state,
    token,
    balance,
    tokenWithdrawQuote,
    allowance,
    allowanceTrxStatus,
  ]);

  return (
    <Dialog open={state?.open} id={id}>
      <PopupLayout
        popupActive={
          allowanceTrxStatus.state > 0 ||
          (transactionStatus?.state > 0 &&
            transactionStatus?.type === state?.type)
        }
      >
        <TxPopup
          type={
            allowanceTrxStatus.state > 0 ? "deposit" : transactionStatus.type
          }
          txCase={
            allowanceTrxStatus?.state
              ? allowanceTrxStatus?.state
              : transactionStatus?.state
          }
          hash={transactionStatus?.hash || allowanceTrxStatus?.hash}
          resetPopup={handleModalClose}
        />
      </PopupLayout>
      <div className={classes.background}>
        <div className={classes.container}>
          <div className="d-flex justify-content-end">
            <Close
              style={{ color: "#212121", fontSize: 28, cursor: "pointer" }}
              onClick={() => {
                setTimeout(() => {
                  setTokenInput("");
                }, 300);
                handleClose();
              }}
            />
          </div>

          <div
            className="d-flex flex-column align-items center justify-content-between"
            style={{ height: "90%" }}
          >
            <div>
              <Typography
                variant="h6"
                align="center"
                style={{ color: "#212121", fontWeight: 600, fontSize: 25 }}
              >
                {state?.type === "deposit" ? "Deposit" : "Withdraw"} Token
              </Typography>
              <Typography
                variant="body2"
                align="center"
                style={{
                  color: "#616161",
                  fontWeight: 400,
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                {state?.type === "deposit"
                  ? " Deposit tokens into PolkaBridge vault and trade hassle free"
                  : " Withdraw  tokens from PolkaBridge vault with fee"}
              </Typography>
            </div>

            <div className="d-flex justify-content-center">
              <div className={classes.inputGroup}>
                <div className="d-flex justify-content-between px-2 pb-2">
                  <Typography
                    variant="body2"
                    align="center"
                    style={{
                      color: "#717171",
                      fontWeight: 400,
                      fontSize: 15,
                      textAlign: "left",
                    }}
                  >
                    Amount:
                  </Typography>
                  <Button
                    // variant="body2"
                    disabled={isMax}
                    align="center"
                    onClick={handleMax}
                    style={{
                      color: "#6A55EA",
                      fontWeight: 600,
                      fontSize: 15,
                      textAlign: "left",
                    }}
                  >
                    Select Max
                  </Button>
                </div>
                <div className="d-flex justify-content-between">
                  <input
                    placeholder="0"
                    value={tokenInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                    label={`Enter amount`}
                    className={classes.input}
                  />

                  <div
                    style={{
                      borderRadius: 30,
                      backgroundColor: "#F4F8FD",

                      padding: "5px 15px 5px 15px",
                      color: "#6A55EA",
                      width: "fit-content",
                      marginLeft: 10,
                      fontSize: 18,
                      fontWeight: 600,
                      display: "flex",
                      height: 44,
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={token?.logo}
                      height="25px"
                      style={{ marginRight: 10 }}
                    />
                    {token?.symbol}
                  </div>
                </div>

                <div className="d-flex justify-content-end px-2">
                  <Typography
                    variant="body2"
                    align="center"
                    style={{
                      color: "#717171",
                      fontWeight: 500,
                      fontSize: 15,
                      textAlign: "left",
                    }}
                  >
                    {state?.type === "deposit"
                      ? ` Balance: ${formatCurrency(
                          fromWei(balance, token?.decimals),
                          true
                        )}`
                      : ` Available Deposits: ${formatCurrency(
                          fromWei(token?.available_balance, token?.decimals),
                          true
                        )}`}
                  </Typography>
                </div>

                {state?.type === "withdraw" && (
                  <>
                    <div className="d-flex justify-content-end px-2">
                      <Typography
                        variant="body2"
                        align="center"
                        style={{
                          color: "#717171",
                          fontWeight: 500,
                          fontSize: 15,
                          textAlign: "left",
                        }}
                      >
                        Withdrawal Fee:{" "}
                        {formatCurrency(
                          fromWei(tokenWithdrawQuote?.fee, token?.decimals),
                          false,
                          4
                        )}
                      </Typography>
                    </div>
                  </>
                )}
                {state?.type === "withdraw" && (
                  <>
                    <div className="d-flex justify-content-end px-2">
                      <Typography
                        variant="body2"
                        align="center"
                        style={{
                          color: "#717171",
                          fontWeight: 500,
                          fontSize: 15,
                          textAlign: "left",
                        }}
                      >
                        Final withdraw amount:{" "}
                        {formatCurrency(
                          fromWei(
                            tokenWithdrawQuote?.final_withdraw_amount,
                            token?.decimals
                          ),
                          false,
                          4
                        )}
                      </Typography>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={classes.buttons}>
              {txStatus === 1 ? (
                <div className="text-center">
                  <CircularProgress className={classes.numbers} />
                  <p className={classes.subheading}>Waiting for confirmation</p>
                </div>
              ) : (
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    variant="light"
                    onClick={() => {
                      setTimeout(() => {
                        setTokenInput("");
                      }, 300);
                      handleClose();
                    }}
                    style={{
                      borderRadius: 10,
                      background: "#f9f9f9",
                      padding: "9px 55px 9px 55px",
                      color: "black",
                      marginRight: 10,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={isConfirmDisabled}
                    style={{
                      borderRadius: 10,
                      background: "#6A55EA",
                      padding: "9px 55px 9px 55px",
                      color: "white",
                    }}
                  >
                    {confirmBtnText}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DepositPopup;
