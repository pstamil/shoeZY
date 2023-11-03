import React from "react";
import { Box } from "@mui/material";
import preLoadGif from "../../assets/preLoad.gif";
import preLoadGif2 from "../../assets/preLoad2.gif";

const Preloader = () => {
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            src={preLoadGif2}
            alt="preLoader2"
            sx={{
              width: "60px",
              height: "60px",
              mixBlendMode: "multiply",
            }}
          />
          <Box
            component="img"
            src={preLoadGif}
            alt="preLoader"
            sx={{
              width: "30px",
              height: "30px",
              mixBlendMode: "multiply",
              position: "absolute",
              top: 15,
              right: 15,
            }}
          />
        </Box>
        <span>Choose Your Fashion!!</span>
      </Box>
    </Box>
  );
};

export default Preloader;
