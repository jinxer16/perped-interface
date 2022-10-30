import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Email,
  GitHub,
  Instagram,
  Telegram,
  Twitter,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100%",
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
    backgroundColor: "#6A55EA",
    borderRadius: 20,
  },
  heading: {
    fontWeight: 600,
    fontSize: 32,
    letterSpacing: "0.02em",
    color: "#212121",
    textAlign: "center",
    paddingLeft: 10,
    [theme.breakpoints.down("md")]: {
      color: "#212121",
      fontSize: 22,
      textAlign: "center",
    },
  },
  para: {
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: "-0.02em",
    color: "#414141",
    textAlign: "center",
    lineHeight: 1.5,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },

  title: {
    fontWeight: 600,
    fontSize: 20,
    letterSpacing: "0.02em",
    color: "#212121",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      color: "#212121",
    },
  },
  description: {
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: "0.02em",
    color: "#414141",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      color: "#212121",
    },
  },
  logo: {
    height: 80,
    [theme.breakpoints.down("md")]: {
      height: 50,
      marginBottom: 10,
    },
  },
  footerWrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box mb={3} mt={3}>
      <Box className={classes.background}>
        <Grid container>
          <Grid item md={3} sm={12} xs={12}>
            <h1
              className={classes.heading}
              style={{ color: "#f9f9f9", marginTop: 10 }}
            >
              <Link to="/">
                <img src="/logoTest.png" className={classes.logo} />
              </Link>
            </h1>
          </Grid>
          <Grid item md={9} sm={12} xs={12} px={2}>
            <Box display="flex" justifyContent="center" flexWrap="wrap">
              <a
                href=""
                target="_blank"
                style={{
                  textDecoration: "none",
                  marginRight: 10,
                }}
              >
                <IconButton style={{ backgroundColor: "#212121" }}>
                  <Twitter style={{ color: "#f9f9f9" }} />
                </IconButton>
              </a>

              <a
                href=""
                target="_blank"
                style={{
                  textDecoration: "none",
                  marginRight: 10,
                }}
              >
                <IconButton
                  style={{
                    backgroundColor: "#212121",
                  }}
                >
                  <Telegram style={{ color: "#f9f9f9" }} />
                </IconButton>
              </a>

              <a
                href=""
                target="_blank"
                style={{
                  textDecoration: "none",
                  marginRight: 10,
                }}
              >
                <IconButton style={{ backgroundColor: "#212121" }}>
                  <GitHub style={{ color: "#f9f9f9" }} />
                </IconButton>
              </a>
              <a
                href=""
                target="_blank"
                style={{
                  textDecoration: "none",
                  marginRight: 10,
                }}
              >
                <IconButton style={{ backgroundColor: "#212121" }}>
                  <Instagram style={{ color: "#f9f9f9" }} />
                </IconButton>
              </a>
              <a
                href="mailto:support@polkabridge.org"
                target="_blank"
                style={{
                  textDecoration: "none",
                }}
              >
                <IconButton style={{ backgroundColor: "#212121" }}>
                  <Email style={{ color: "#f9f9f9" }} />
                </IconButton>
              </a>
            </Box>
            <p
              className={classes.para}
              style={{ color: "#f9f9f9", marginTop: 20 }}
            >
              Join 100K+ people working together to make the world a better
              place.
            </p>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.footerWrapper} mt={5}>
        <p className={classes.para} style={{ color: "#212121", marginTop: 10 }}>
          Copyright 2022 By{" "}
          <a
            href="https://polkabridge.org/"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <span style={{ color: "#6A55EA" }}>Perped protocol</span>
          </a>
          . All Rights Reserved.
        </p>
      </Box>
    </Box>
  );
}
