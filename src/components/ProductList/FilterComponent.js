import React, { useState, useEffect } from "react";
import {
  ListItem,
  TextField,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  ListItemText,
  ListItemButton,
  Grid,
  Divider,
} from "@mui/material";
import { CheckCircle, Circle } from "@mui/icons-material";

const FilterComponent = ({ applyFilters, categories, brands, colors }) => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [brandFilters, setBrandFilters] = useState([]);
  const [colorFilters, setColorFilters] = useState([]);

  useEffect(() => {
    applyFilters({
      category,
      priceRange,
      brandFilters,
      colorFilters,
    });
  }, [category, priceRange, brandFilters, colorFilters, applyFilters]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleMinPriceChange = (event) => {
    setPriceRange([event.target.value, priceRange[1]]);
  };

  const handleMaxPriceChange = (event) => {
    setPriceRange([priceRange[0], event.target.value]);
  };

  const handleBrandChange = (event) => {
    const brand = event.target.name;
    setBrandFilters(
      brandFilters.includes(brand)
        ? brandFilters.filter((item) => item !== brand)
        : [...brandFilters, brand]
    );
  };

  const handleColorChange = (event) => {
    const color = event.target.name;
    setColorFilters(
      colorFilters.includes(color)
        ? colorFilters.filter((item) => item !== color)
        : [...colorFilters, color]
    );
  };

  const marks = [
    {
      value: 0,
      label: "₹0",
    },
    {
      value: 10000,
      label: "₹10000",
    },
  ];

  const sortedBrands = [...brands].sort();
  const sortedColors = [...colors].sort();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={6} md={12} lg={12} xl={12}>
          <Box
            sx={{
              bgcolor: "#7A73EA",
              color: "white",
              p: "15px 30px",
              display: { xs: "block", sm: "none", md: "block", lg: "block" },
              mt: { xs: 2, sm: 0, md: 0, lg: 0 },
            }}
          >
            <p style={{ fontWeight: "600" }}>CATEGORIES</p>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: "10px 8px 10px 15px",
              mt: { xs: 2, sm: 2, md: 0, lg: 0 },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "block", md: "none", lg: "none" },
              }}
            >
              <p style={{ margin: "0 0 10px 14px", fontWeight: "600" }}>
                CATEGORIES
              </p>
            </Box>
            <ListItemButton onClick={() => handleCategoryChange("")}>
              <ListItemText primary="All categries" />
            </ListItemButton>
            <Divider variant="middle" />
            {categories.map((cat) => (
              <Box key={cat}>
                <ListItemButton onClick={() => handleCategoryChange(cat)}>
                  <ListItemText primary={cat} />
                </ListItemButton>
                <Divider variant="middle" />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={12} xl={12} sx={{ mt: 3 }}>
          <Box
            sx={{
              bgcolor: "#7A73EA",
              color: "white",
              p: "15px 30px",
              display: { xs: "block", sm: "none", md: "block", lg: "block" },
            }}
          >
            <p style={{ fontWeight: "600" }}>PRICE RANGE:</p>
          </Box>
          <ListItem>
            <Box>
              <Box
                sx={{
                  display: { xs: "none", sm: "block", md: "none", lg: "none" },
                }}
              >
                <p style={{ fontWeight: "600" }}>PRICE RANGE:</p>
              </Box>
              <Box sx={{ width: "180px", mt: 1.5, ml: 2 }}>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  marks={marks}
                  max={10000}
                  size="small"
                  color="secondary"
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <TextField
                  type="number"
                  label="Min Price"
                  value={priceRange[0]}
                  onChange={handleMinPriceChange}
                  size="small"
                />
                <TextField
                  type="number"
                  label="Max Price"
                  value={priceRange[1]}
                  onChange={handleMaxPriceChange}
                  size="small"
                />
              </Box>
            </Box>
          </ListItem>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={12}
          lg={12}
          xl={12}
          sx={{ mt: { xs: 2, sm: 2, md: 3, lg: 3 } }}
        >
          <Box
            sx={{
              bgcolor: "#7A73EA",
              color: "white",
              p: "15px 30px",
              display: { xs: "block", sm: "none", md: "block", lg: "block" },
            }}
          >
            <p style={{ fontWeight: "600" }}>BRANDS</p>
          </Box>
          <ListItem>
            <FormGroup>
              <Box
                sx={{
                  display: { xs: "none", sm: "block", md: "none", lg: "none" },
                }}
              >
                <p style={{ fontWeight: "600" }}>BRANDS</p>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: {
                    xs: "start",
                    sm: "strat",
                    md: "space-between",
                    lg: "space-between",
                  },
                  flexWrap: "wrap",
                }}
              >
                {sortedBrands.map((brand) => (
                  <FormControlLabel
                    key={brand}
                    control={
                      <Checkbox
                        checked={brandFilters.includes(brand)}
                        onChange={handleBrandChange}
                        name={brand}
                        color="secondary"
                        size="small"
                      />
                    }
                    label={brand}
                  />
                ))}
              </Box>
            </FormGroup>
          </ListItem>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={12}
          lg={12}
          xl={12}
          mb={2}
          sx={{ mt: { xs: 2, sm: 2, md: 3, lg: 3 } }}
        >
          <Box
            sx={{
              bgcolor: "#7A73EA",
              color: "white",
              p: "15px 30px",
              display: { xs: "block", sm: "none", md: "block", lg: "block" },
            }}
          >
            <p style={{ fontWeight: "600" }}>COLORS</p>
          </Box>
          <ListItem>
            <FormGroup>
              <Box
                sx={{
                  display: { xs: "none", sm: "block", md: "none", lg: "none" },
                }}
              >
                <p style={{ fontWeight: "600" }}>COLORS</p>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: {
                    xs: "start",
                    sm: "strat",
                    md: "space-between",
                    lg: "space-between",
                  },
                  flexWrap: "wrap",
                }}
              >
                {sortedColors.map((color) => (
                  <FormControlLabel
                    key={color}
                    control={
                      <Checkbox
                        checked={colorFilters.includes(color)}
                        onChange={handleColorChange}
                        name={color}
                        icon={
                          <Circle
                            sx={{
                              color: { color },
                              border:
                                color === "White" ? "0.5px solid gray" : "none",
                              fontSize: color === "White" ? "18px" : "20px",
                              borderRadius: "50%",
                              mr: color === "White" ? "5px" : "0px",
                            }}
                          />
                        }
                        checkedIcon={
                          <CheckCircle
                            sx={{
                              color: { color },
                              border:
                                color === "White" ? "0.5px solid gray" : "none",
                              fontSize:
                                color === "White" || color === "Yellow"
                                  ? "18px"
                                  : "20px",
                              borderRadius: "50%",
                              mr: color === "White" ? "5px" : "0px",
                              bgcolor:
                                color === "White" || color === "Yellow"
                                  ? "black"
                                  : "white",
                            }}
                          />
                        }
                      />
                    }
                    label={color}
                  />
                ))}
              </Box>
            </FormGroup>
          </ListItem>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterComponent;
