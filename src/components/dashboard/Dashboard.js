import React from "react";
import Box from "@mui/material/Box";
import { Container, Grid } from "@mui/material";
import {
  CollectionsBookmark,
  GpsFixed,
  SupportAgent,
  WebStories,
} from "@mui/icons-material";
import BarChartGraph from "./pages/chart/BarChartGraph";
import StatsChart from "./pages/chart/StatsChart";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex", mt: 15, mb: 10 }}>
      <Container>
        <p style={{ fontSize: "20px" }}>Welcome back !!🎉</p>
        <Grid container spacing={3} mt={0.5}>
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <Box
              sx={{
                height: "110px",
                bgcolor: "#F96423",
                border: "1px solid #F96423",
                borderRadius: "10px",
                color: "white",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  p: "0 20px",
                }}
              >
                <p style={{ fontSize: "20px" }}>Brands</p>
                <WebStories fontSize="large" />
              </Box>
              <Box sx={{ pl: 3 }}>
                <h1>10 +</h1>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <Box
              sx={{
                height: "110px",
                bgcolor: "#0BB68E",
                border: "1px solid #0BB68E",
                borderRadius: "10px",
                color: "white",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  p: "0 20px",
                }}
              >
                <p style={{ fontSize: "20px" }}>Products</p>
                <CollectionsBookmark fontSize="large" />
              </Box>
              <Box sx={{ pl: 3 }}>
                <h1>500 +</h1>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <Box
              sx={{
                height: "110px",
                bgcolor: "#7466FF",
                border: "1px solid #7466FF",
                borderRadius: "10px",
                color: "white",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  p: "0 20px",
                }}
              >
                <p style={{ fontSize: "20px" }}>Locations</p>
                <GpsFixed fontSize="large" />
              </Box>
              <Box sx={{ pl: 3 }}>
                <h1>100 +</h1>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <Box
              sx={{
                height: "110px",
                bgcolor: "#1D7FFF",
                border: "1px solid #1D7FFF",
                borderRadius: "10px",
                color: "white",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  p: "0 20px",
                }}
              >
                <p style={{ fontSize: "20px" }}>Customers</p>
                <SupportAgent fontSize="large" />
              </Box>
              <Box sx={{ pl: 3 }}>
                <h1>100 +</h1>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid container mt={5} mb={5}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={5.75}
            xl={5.75}
            sx={{
              bgcolor: "#EDF8F6",
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              p: "0 30px 20px 30px",
            }}
          >
            <h3 style={{ padding: "20px 0" }}>Bar Graph</h3>
            <BarChartGraph />
          </Grid>
          <Grid item xs={0} sm={0} md={0} lg={0.5} xl={0.5}></Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={5.75}
            xl={5.75}
            sx={{
              bgcolor: "#EDF8F6",
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              p: "0 0 20px 30px",
              mt: { xs: 3, sm: 3, md: 3, lg: 0, xl: 0 },
            }}
          >
            <h3 style={{ padding: "20px 0" }}>Stats Graph</h3>
            <StatsChart />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={7}>
            <p style={{ fontSize: "20px" }}>Contact Notifications</p>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              doloribus.
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
