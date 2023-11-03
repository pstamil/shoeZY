import { Box, Container, Grid } from "@mui/material";
import React from "react";
import aboutImg1 from "../../../assets/aboutImg1.jpg";
import { BlurOn } from "@mui/icons-material";

function AboutBanner() {
  return (
    <Container>
      <Box
        sx={{
          mb: 8,
          mt: 10,
          textAlign: "center",
          width: "100%",
        }}
        data-aos="fade-right"
        data-aos-offset="50"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <h1 style={{ fontWeight: "500" }}>WE BRING THE LATEST TRENDY WEAR</h1>
      </Box>
      <Grid container>
        <Grid item xs={0} sm={0} md={1} lg={1}></Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              height: "100%",
            }}
            data-aos="fade-right"
            data-aos-offset="50"
            data-aos-delay="50"
            data-aos-duration="1300"
            data-aos-easing="ease-in-out"
          >
            <h1 style={{ fontSize: "21px", fontWeight: 600 }}>
              WALK LIGHTLY LEARNING TO ENJOY YOUR WALK..
            </h1>
            <p style={{ fontSize: "14px" }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
              dolorum, aperiam impedit molestias consequatur fugiat explicabo
              quasi accusantium reprehenderit quaerat.
            </p>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          sx={{ mt: { xs: 3, sm: 5, md: 0, lg: 0 } }}
        >
          <Box
            component="img"
            src={aboutImg1}
            sx={{ width: "100%", height: "95%" }}
            data-aos="fade-right"
            data-aos-offset="50"
            data-aos-delay="50"
            data-aos-duration="1600"
            data-aos-easing="ease-in-out"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          sx={{ mt: { xs: 3, sm: 5, md: 0, lg: 0 } }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              height: "100%",
              gap: 2,
              pl: { xs: 2, sm: 2, md: 0, lg: 0 },
            }}
            data-aos="fade-right"
            data-aos-offset="50"
            data-aos-delay="50"
            data-aos-duration="2000"
            data-aos-easing="ease-in-out"
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <BlurOn color="secondary" />
              <span>CASUAL SHOES</span>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <BlurOn color="secondary" />
              <span>FORMAL SHOES</span>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <BlurOn color="secondary" />
              <span>SPORTS SHOES</span>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <BlurOn color="secondary" />
              <span>SNEAKERS</span>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <BlurOn color="secondary" />
              <span>BOOTS</span>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutBanner;
