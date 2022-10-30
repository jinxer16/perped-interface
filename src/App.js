import "./App.css";
import React from "react";
import theme from "./theme";
import { Fragment } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Appbar from "./common/Appbar";
import { Container } from "@mui/material";
import Footer from "./common/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Router>
          <div className="mb-5">
            <Appbar />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Container>
            <Footer />
          </Container>
        </Router>
      </Fragment>
    </ThemeProvider>
  );
}

export default App;
