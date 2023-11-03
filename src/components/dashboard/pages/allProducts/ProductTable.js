import { Star } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Grid,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductTable({ product, percentage, confirmDelete }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 4,
            pb: 1,
          }}
        >
          <img
            style={{ height: 100, width: "11rem" }}
            src={product.images[0]}
            alt={product.name}
          />
        </Box>
        <CardContent sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <p
              style={{
                fontWeight: "500",
                fontSize: "13px",
                color: "gray",
                textTransform: "uppercase",
              }}
            >
              {product.brand}
            </p>
            <Chip
              icon={<Star />}
              color="secondary"
              size="small"
              label={product.rating}
              sx={{ color: "white" }}
            />
          </Box>
          <h3 style={{ fontWeight: 500 }}>{product.name}</h3>
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

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <span>Colors:</span>
            {product.colors.map((color, index) => (
              <Box
                key={index}
                sx={{
                  width: "18px",
                  height: "18px",
                  bgcolor: color,
                  border: color === "White" ? "1px solid black" : "none",
                }}
              ></Box>
            ))}
          </Box>
        </CardContent>
        <Box sx={{ width: "100%", ml: 3 }}>
          <Button
            onClick={() => setDetailsOpen(!detailsOpen)}
            color="secondary"
          >
            View details
          </Button>
        </Box>
        <Collapse
          in={detailsOpen}
          timeout="auto"
          unmountOnExit
          sx={{ width: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "100%",
              ml: 3,
              mt: 1,
              mb: 1,
            }}
          >
            <span>
              <span style={{ fontWeight: "bold" }}>IdealFor: </span>{" "}
              {product.idealFor === "Both" ? "Men and Women" : product.idealFor}
            </span>
            <span>
              <span style={{ fontWeight: "bold" }}>Category: </span>{" "}
              {product.category}
            </span>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: "bold" }}>Description: </span>{" "}
              <span style={{ fontSize: "13px" }}>
                {product.description.substring(0, 50).concat("...")}
              </span>
            </Box>
          </Box>
        </Collapse>
        <CardContent sx={{ display: "flex", gap: 2, width: "100%" }}>
          <Button
            variant="contained"
            color="success"
            sx={{ color: "white" }}
            onClick={() => navigate(`edit/${product.id}`)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => confirmDelete(product.id)}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ProductTable;
