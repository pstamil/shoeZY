import { Star } from "@mui/icons-material";
import { Box, CardContent, Grid } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function ProductCard({ product, percentage }) {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      lg={4}
      xl={3}
      data-aos="fade-up"
      data-aos-offset="50"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
    >
      <NavLink
        to={`/shop/${product.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Box
          sx={{
            minHeight: 360,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            border: "1.5px solid #E5E8EB",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: "30px 20px",
            }}
          >
            <img
              style={{ height: 120, width: "13rem", mixBlendMode: "multiply" }}
              src={product.images[0]}
              alt={product.name}
            />
          </Box>
          <CardContent>
            <p
              style={{
                fontWeight: "500",
                fontSize: "12px",
                color: "gray",
                textTransform: "uppercase",
              }}
            >
              {product.brand}
            </p>

            <h4
              style={{
                fontWeight: 500,
                marginBottom: "5px",
                textTransform: "uppercase",
              }}
            >
              {product.name}
            </h4>

            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: "#00C194",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "30px",
                color: "white",
                p: "2px 0",
              }}
            >
              <Star fontSize="small" />

              <span>{product.rating}</span>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "start",
                mb: 1,
              }}
            >
              <p
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                ₹ {product.offerPrice}
              </p>
              <p
                style={{
                  textDecoration: "line-through",
                  color: "gray",
                }}
              >
                ₹{product.previousPrice}
              </p>
              <p style={{ color: "green" }}>{percentage.toFixed(0)}%off</p>
            </Box>
            <p style={{ fontSize: "12px" }}>Free delivery</p>
          </CardContent>
        </Box>
      </NavLink>
    </Grid>
  );
}

export default ProductCard;
