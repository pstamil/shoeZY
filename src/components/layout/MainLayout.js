import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import BackToTop from "../BackToTop";
import { Box } from "@mui/material";

function MainLayout() {
  return (
    <>
      <NavBar />
      <Box>
        <Outlet />
      </Box>
      <Box sx={{ bgcolor: "#F5F5F5", mt: 15 }}>
        <Footer />
      </Box>

      <BackToTop />
    </>
  );
}

export default MainLayout;
