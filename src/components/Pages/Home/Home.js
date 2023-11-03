import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import HomeSlide from "../../slider/HomeSlide";
import PopulerProduct from "../../ProductList/PopulerProduct";
import Banner from "../../banner/Banner";
import { useNavigate } from "react-router-dom";
import DealsProduct from "../../ProductList/DealsProduct";

function Home() {
  const navigate = useNavigate();
  return (
    <Box sx={{ position: "relative" }}>
      <HomeSlide />
      <Container>
        <Box
          sx={{
            position: "absolute",
            top: { xs: 150, md: 220, lg: 220, sm: 190 },
          }}
        >
          <p
            style={{ fontSize: "22px", fontWeight: "400" }}
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            Men's Originals
          </p>
          <Box
            sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="1200"
            data-aos-easing="ease-in-out"
          >
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: "800",
                  fontSize: { xs: "38px", sm: "40px", md: "60px", lg: "60px" },
                  mb: 2,
                }}
              >
                Shoe
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: "800",
                  fontSize: { xs: "38px", sm: "40px", md: "60px", lg: "60px" },
                  color: "red",
                }}
              >
                ZY
              </Typography>
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontWeight: "800",
                fontSize: { xs: "38px", sm: "40px", md: "60px", lg: "60px" },
                mr: 2,
              }}
            >
              shoes.
            </Typography>
          </Box>

          <p
            style={{ marginRight: "20px", fontSize: "14px" }}
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="1400"
            data-aos-easing="ease-in-out"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />
            Vitae doloribus dolorum et, eos ipsum debitis.
          </p>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
            onClick={() => navigate("/shop")}
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="1600"
            data-aos-easing="ease-in-out"
          >
            Shop Now
          </Button>
        </Box>
        <Banner />
      </Container>
      <PopulerProduct />
      <DealsProduct />
    </Box>
  );
}

export default Home;
