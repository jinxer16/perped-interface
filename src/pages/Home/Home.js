import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Trade from "../../common/trade/Trade";
const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url("images/tokens.png"), linear-gradient(180deg, #ffffff 0%, #d9e8fc 100%)`,

    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "contain",
    height: "100%",
    width: "100%",
    paddingTop: "3%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  mainHeading: {
    fontWeight: 600,
    fontSize: 28,
    letterSpacing: "0.02em",
    color: "#212121",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      color: "#212121",
    },
  },
  para: {
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: "0.02em",
    color: "#414141",
    textAlign: "center",
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  buttonFirst: {
    width: "fit-content",
    color: "#212121",
    backgroundColor: "#eeeeee",
    padding: "12px 50px 12px 50px",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      padding: "8px 30px 8px 30px",
    },
  },
  buttonSecond: {
    width: "fit-content",
    color: "white",
    backgroundColor: "#6A55EA",
    padding: "12px 50px 12px 50px",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      padding: "8px 30px 8px 30px",
    },
  },
  filterCard: {
    marginTop: 10,
    marginBottom: 10,
    height: "100%",
    width: "80%",
    border: "1px solid #eeeeee",

    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
  },
  pageTitle: {
    fontWeight: 600,
    fontSize: 36,
    letterSpacing: "0.02em",
    color: "#414141",
    textAlign: "center",
    paddingTop: 10,
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
  },
  subTitle: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: 400,
    color: "#757575",
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },
}));

export default function Home() {
  const classes = useStyles();

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Box className={classes.background}>
      <Box>
        <Container style={{ marginTop: 40 }}>
          <Box className={classes.buttonWrapper}>
            <Trade />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
