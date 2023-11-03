import { Box, Typography } from "@mui/material";
import React from "react";
import qoute from "../../../assets/quote.svg";

const QuoteDesign = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100px",
        p: "20px",
        width: "100%",
        boxShadow:
          " rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "6px",
        mt: 10,
        flexWrap: "wrap",
      }}
      data-aos="fade-down"
      data-aos-offset="50"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "12px", sm: "14px", md: "18px", lg: "18px" },
        }}
      >
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque nisi
        dolor odit qui quidem labore!"
      </Typography>
      <Box sx={{ position: "absolute", top: "-20%", left: "3%" }}>
        <img
          src={qoute}
          alt="qoute"
          style={{ width: "40px", height: "40px" }}
        />
      </Box>
    </Box>
  );
};

export default QuoteDesign;
