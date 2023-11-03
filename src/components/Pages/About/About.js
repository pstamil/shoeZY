import React from "react";
import about from "../../../assets/about.jpg";
import { Box, Container, Grid, Typography } from "@mui/material";
import AboutBanner from "./AboutBanner";
import QuoteDesign from "./QuoteDesign";
import aboutImg2 from "../../../assets/aboutImg2.jpg";

function About() {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundImage: `url(${about})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: { xs: "50vh", sm: "70vh", md: "80vh", lg: "80vh" },
          position: "relative",
          opacity: 0.9,
          filter: "brightness(50%)",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          fontWeight: "bold",
          color: "white",
        }}
      >
        <h6
          style={{
            fontSize: "44px",
            marginBottom: 2,
          }}
          data-aos="fade-up"
          data-aos-offset="100"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
        >
          About Us
        </h6>
        <Typography
          sx={{
            fontSize: { xs: "13px", sm: "16px", md: "16px", lg: "20px" },
            m: "0 20px",
          }}
          data-aos="fade-up"
          data-aos-offset="100"
          data-aos-delay="50"
          data-aos-duration="1300"
          data-aos-easing="ease-in-out"
        >
          We're on a mission to change the fashion.
        </Typography>
      </Box>
      <Box>
        <Container>
          <QuoteDesign />
          <Grid container mt={10} mb={10}>
            <Grid
              item
              xs={12}
              sm={12}
              md={4.5}
              lg={4.5}
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 300, sm: 480, md: 380, lg: 380 },
                m: {
                  xs: "10px 30px 30px 0",
                  sm: "10px 30px 30px 0",
                  md: 0,
                  lg: 0,
                },
                bgcolor: "#FF5A5F",
              }}
              data-aos="fade-right"
              data-aos-offset="50"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            >
              <Box
                component="img"
                src={aboutImg2}
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: { xs: 20, sm: 20, md: 30, lg: 30 },
                  left: { xs: 20, sm: 20, md: 30, lg: 30 },
                }}
                data-aos="fade-right"
                data-aos-offset="50"
                data-aos-delay="50"
                data-aos-duration="1300"
                data-aos-easing="ease-in-out"
              />
            </Grid>
            <Grid item xs={0} sm={0} md={1} lg={1}></Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6.5}
              lg={6.5}
              sx={{ mt: { xs: 4, sm: 4, md: 0, lg: 0 } }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 2,
                  height: "100%",
                }}
                data-aos="fade-right"
                data-aos-offset="50"
                data-aos-delay="50"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out"
              >
                <h1 style={{ fontWeight: 600 }}>Lorem ipsum dolor.</h1>
                <p style={{ fontSize: "14px" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis consectetur sed tenetur autem quisquam. Non ratione
                  ipsum quod commodi officiis, adipisci consectetur libero cum
                  molestias quas sequi. Atque rem commodi tempora molestias
                  numquam ipsam, sit obcaecati fugit, animi officiis perferendis
                  voluptatibus delectus laboriosam dolore ullam error laudantium
                  accusantium, placeat labore?
                </p>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Grid container mt={8} mb={15}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6.5}
              lg={6.5}
              sx={{ mt: { xs: 4, sm: 4, md: 0, lg: 0 } }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 2,
                  height: "100%",
                }}
                data-aos="fade-right"
                data-aos-offset="50"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
              >
                <h1 style={{ fontWeight: 600 }}>Lorem ipsum dolor.</h1>
                <p style={{ fontSize: "14px" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis consectetur sed tenetur autem quisquam. Non ratione
                  ipsum quod commodi officiis, adipisci consectetur libero cum
                  molestias quas sequi. Atque rem commodi tempora molestias
                  numquam ipsam, sit obcaecati fugit, animi officiis perferendis
                  voluptatibus delectus laboriosam dolore ullam error laudantium
                  accusantium, placeat labore?
                </p>
              </Box>
            </Grid>
            <Grid item xs={0} sm={0} md={1} lg={1}></Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4.5}
              lg={4.5}
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 300, sm: 480, md: 380, lg: 380 },
                m: {
                  xs: "30px 40px 30px 0",
                  sm: "30px 40px 30px 0",
                  md: 0,
                  lg: 0,
                },
                bgcolor: "#FF5A5F",
              }}
              data-aos="fade-right"
              data-aos-offset="50"
              data-aos-delay="50"
              data-aos-duration="1300"
              data-aos-easing="ease-in-out"
            >
              <Box
                component="img"
                src={aboutImg2}
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 30,
                  left: 30,
                }}
                data-aos="fade-right"
                data-aos-offset="50"
                data-aos-delay="50"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box mt={5} mb={8}>
        <AboutBanner />
      </Box>
    </Box>
  );
}

export default About;
