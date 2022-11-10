import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helper";

const marks = [
  {
    value: 2,
    label: "2x",
  },
  {
    value: 5,
    label: "5x",
  },
  {
    value: 10,
    label: "10x",
  },
  {
    value: 15,
    label: "15x",
  },
  {
    value: 20,
    label: "20x",
  },
  {
    value: 25,
    label: "25x",
  },
  {
    value: 30,
    label: "30x",
  },
];

export default function TradeInfo() {
  const [leverage, setLeverate] = useState(10);
  function valuetext(value) {
    return `${value}x`;
  }

  const entryPrice = useSelector((state) => state?.trade?.entryPrice);

  const leverageSliderHandle = (e) => {
    console.log("slider value ", e.target.value);
    setLeverate(e.target.value);
  };

  return (
    <Box display="flex" flexDirection={"column"} alignItems="center">
      <Box width={"95%"}>
        <Slider
          aria-label="Custom marks"
          onChange={leverageSliderHandle}
          getAriaValueText={valuetext}
          valueLabelFormat={valuetext}
          step={0.1}
          min={1.1}
          max={30.5}
          defaultValue={leverage}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </Box>

      <Box
        width={"100%"}
        display={"flex"}
        justifyContent="space-between"
        alignItems="space-between"
        mt={1.5}
      >
        <Typography>Collateral In</Typography>
        <Typography>USDC</Typography>
      </Box>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent="space-between"
        alignItems="space-between"
        mt={0.5}
      >
        <Typography>Leverage</Typography>
        <Typography>{leverage}x</Typography>
      </Box>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent="space-between"
        alignItems="space-between"
        mt={0.5}
      >
        <Typography>Entry Price</Typography>
        <Typography>${formatCurrency(entryPrice, true)}</Typography>
      </Box>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent="space-between"
        alignItems="space-between"
        mt={0.5}
      >
        <Typography>Liq. Price</Typography>
        <Typography>$1,402.90</Typography>
      </Box>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent="space-between"
        alignItems="space-between"
        mt={0.5}
      >
        <Typography>Fees</Typography>
        <Typography>$1.52</Typography>
      </Box>
    </Box>
  );
}
