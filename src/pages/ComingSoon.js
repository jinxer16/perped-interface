import React from "react";
import { IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Telegram, Twitter } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100%",
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingLeft: "5%",
    backgroundColor: "#6A55EA",
    minHeight: "100vh",
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
  imgMain: {
    height: 400,
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "100%",
    },
  },
  textP: {
    fontWeight: 500,
    color: "#e5e5e5",
    fontSize: 16,
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
}));

const ComingSoon = () => {
  const classes = useStyles();

  return (
    <div>
      {" "}
      <Box className={classes.background}>
        <Box mb={5}>
          <div className="text-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/website-launching-coming-soon-2112253-1782224.png"
              className={classes.imgMain}
            />
          </div>
          <Typography
            variant="h2"
            color="textSecondary"
            align="center"
            style={{ fontWeight: 600, color: "#ffffff", fontSize: 36 }}
          >
            Next testnet version coming!
          </Typography>

          <div className="d-flex justify-content-center mt-2">
            <Typography
              variant="body2"
              className={classes.textP}
              align="center"
            >
              V2.0 Release Time: 2PM UTC, 24th October 2022
            </Typography>
          </div>

          <Typography
            variant="h2"
            color="textSecondary"
            align="center"
            style={{
              fontWeight: 600,
              color: "yellow",
              fontSize: 24,
              marginTop: 30,
              marginBottom: 10,
            }}
          >
            Follow Us
          </Typography>
          <div className="d-flex justify-content-center ">
            <a
              href="https://twitter.com/realpolkabridge"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <IconButton
                style={{ backgroundColor: "#212121", marginRight: 10 }}
              >
                <Twitter style={{ color: "#f9f9f9" }} />
              </IconButton>
            </a>

            <a
              href="https://t.me/polkabridgegroup"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {" "}
              <IconButton
                style={{ backgroundColor: "#212121", marginRight: 10 }}
              >
                <Telegram style={{ color: "#f9f9f9" }} />
              </IconButton>
            </a>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default ComingSoon;
