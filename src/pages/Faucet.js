import React, { useCallback, useState } from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import PopupLayout from "../common/popups/PopupLayout";
import TxPopup from "../common/popups/TxPopup";
import { useClaimCallback } from "../hooks/useClaimCallback";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100%",
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingLeft: "5%",
  },
  card: {
    padding: 10,
    border: "1px solid #919191",
    width: 400,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 20,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      height: 80,
      fontSize: 14,
    },
  },
}));

const Faucet = () => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

  const userSelectedChain = useSelector((state) => state?.user?.chainId);
  const authenticated = useSelector((state) => state?.user?.authenticated);

  const { claimTokens, transactionStatus, resetTrxState } = useClaimCallback();

  const claimTokensHandler = (tokenAddress) => {
    console.log("res");
    claimTokens(tokenAddress);
  };

  const handleModalClose = useCallback(() => {
    setOpen(false);
    resetTrxState();
  }, [isOpen]);

  return (
    <div>
      {" "}
      <Box className={classes.background}>
        <PopupLayout popupActive={transactionStatus?.state > 0}>
          <TxPopup
            txCase={transactionStatus?.state}
            hash={transactionStatus?.hash}
            resetPopup={handleModalClose}
          />
        </PopupLayout>
        <Box mb={5}>
          <Typography variant="h3" color="textSecondary" align="center">
            Claim Faucet
          </Typography>
          <div className="text-center">
            Claim test tokens for Rinkeby Testnet or BSC Testnet.
          </div>
        </Box>
        {authenticated ? (
          <div>
            {userSelectedChain === 5 ? (
              <Box
                mt={3}
                display={"flex"}
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  className={classes.card}
                  style={{ backgroundColor: "#d1c4e9" }}
                  onClick={() => {
                    claimTokensHandler(
                      "0x89f01bc9865324583380d8d7ed08b8046bffd7fd"
                    );
                  }}
                >
                  <img
                    src="https://s2.coinmarketcap.com/static/img/coins/200x200/8320.png"
                    height="30px"
                    style={{ marginRight: 10 }}
                  />
                  Claim PBR Faucet (Goerli)
                </Box>
                <Box
                  className={classes.card}
                  style={{ backgroundColor: "#d1c4e9" }}
                  onClick={() => {
                    claimTokensHandler(
                      "0x1cfd6813a59d7b90c41dd5990ed99c3bf2eb8f55"
                    );
                  }}
                >
                  <img
                    src="https://seeklogo.com//images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png"
                    height="27px"
                    style={{ marginRight: 10 }}
                  />{" "}
                  Claim USDT Faucet (Goerli)
                </Box>
              </Box>
            ) : (
              <Box
                mt={3}
                display={"flex"}
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  className={classes.card}
                  style={{ backgroundColor: "#ede7f6" }}
                  onClick={() => {
                    claimTokensHandler(
                      "0xcdc22234e41a94ef3c028e0208b0f55cb63a3008"
                    );
                  }}
                >
                  <img
                    src="https://s2.coinmarketcap.com/static/img/coins/200x200/8320.png"
                    height="30px"
                    style={{ marginRight: 10 }}
                  />{" "}
                  Claim PBR Faucet (BNB)
                </Box>
                <Box
                  className={classes.card}
                  style={{ backgroundColor: "#ede7f6" }}
                  onClick={() => {
                    claimTokensHandler(
                      "0x84a73728582591a1aa90a25a07f4f636331d6c1e"
                    );
                  }}
                >
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/binance-usd-busd-cryptocurrency-5108581-4263918.png"
                    height="30px"
                    style={{ marginRight: 10 }}
                  />{" "}
                  Claim BUSD Faucet (BNB)
                </Box>
              </Box>
            )}
          </div>
        ) : (
          <div>
            Wrong network, Please switch to Rinkeby Testnet or BSC Testnet.
          </div>
        )}
      </Box>
    </div>
  );
};

export default Faucet;
