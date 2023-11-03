import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Banner from "../../banner/Banner";
import ProductList from "../../ProductList/ProductList";
import product from "../../../assets/product.jpg";
import DealsProduct from "../../ProductList/DealsProduct";

function Shop() {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          backgroundImage: `url(${product})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: { xs: "50vh", sm: "50vh", md: "70vh", lg: "70vh" },
        }}
      ></Box>
      <Container>
        <Banner />
        <Box
          sx={{
            position: "absolute",
            top: { xs: 190, md: 220, lg: 220, sm: 190 },
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
          <Box>
            <Typography
              variant="h1"
              sx={{
                maxWidth: "450px",
                fontWeight: "800",
                fontSize: { xs: "38px", sm: "40px", md: "60px", lg: "60px" },
                mt: 2,
                mr: "20px",
              }}
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-delay="50"
              data-aos-duration="1200"
              data-aos-easing="ease-in-out"
            >
              ShoeZY shoes.
            </Typography>
          </Box>
        </Box>
      </Container>
      <ProductList />
      <DealsProduct />
    </Box>
  );
}

export default Shop;
