import React, { useEffect, useState } from "react";
import { db } from "../../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  PaginationItem,
} from "@mui/material";
import ProductCard from "./ProductCard";
import FilterComponent from "./FilterComponent";
import { ArrowBack, ArrowForward, Sort, Tune } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, setProducts } from "../../redux/Slices/productsSlice";

import filterNotfound from "../../assets/filterNotfound.svg";

const ProductList = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({
    category: "",
    priceRange: [0, 10000],
    brandFilters: [],
    colorFilters: [],
  });

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
    setSortOpen(false);
  };
  const [sortOpen, setSortOpen] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);

  const handleSortOpen = () => {
    setSortOpen(!sortOpen);
    setFilterOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const querySnapshot = await getDocs(productsCollection);

        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });

        const uniqueCategories = [
          ...new Set(productsData.map((product) => product.category)),
        ];
        const uniqueBrands = [
          ...new Set(productsData.map((product) => product.brand)),
        ];

        const uniqueColors = new Set();

        productsData.forEach((product) => {
          product.colors.forEach((color) => {
            uniqueColors.add(color);
          });
        });

        const uniqueColorsArray = [...uniqueColors];

        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
        setColors(uniqueColorsArray);

        dispatch(setProducts(productsData));
        setFilteredProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const applyFilters = (filters) => {
    setAppliedFilters(filters);

    const filtered = products.filter((product) => {
      const { category, priceRange, brandFilters, colorFilters } = filters;
      return (
        (category === "" || product.category === category) &&
        priceRange[0] <= product.offerPrice &&
        product.offerPrice <= priceRange[1] &&
        (brandFilters.length === 0 || brandFilters.includes(product.brand)) &&
        (colorFilters.length === 0 ||
          colorFilters.some((color) => product.colors.includes(color)))
      );
    });

    setFilteredProducts(filtered);
  };

  const [sortBy, setSortBy] = useState("default");

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  useEffect(() => {
    let filtered = [...products];

    if (appliedFilters.category) {
      filtered = filtered.filter(
        (product) => product.category === appliedFilters.category
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.offerPrice >= appliedFilters.priceRange[0] &&
        product.offerPrice <= appliedFilters.priceRange[1]
    );

    if (appliedFilters.brandFilters.length > 0) {
      filtered = filtered.filter((product) =>
        appliedFilters.brandFilters.includes(product.brand)
      );
    }

    if (appliedFilters.colorFilters.length > 0) {
      filtered = filtered.filter((product) =>
        appliedFilters.colorFilters.some((color) =>
          product.colors.includes(color)
        )
      );
    }

    if (sortBy === "price-low-to-high") {
      filtered.sort((a, b) => a.offerPrice - b.offerPrice);
    } else if (sortBy === "price-high-to-low") {
      filtered.sort((a, b) => b.offerPrice - a.offerPrice);
    } else if (sortBy === "newest-first") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredProducts(filtered);
  }, [appliedFilters, sortBy, products]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <Container>
      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={0} sm={0} md={3.5} lg={3}>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
                xl: "block",
              },
            }}
          >
            <Box
              sx={{
                width: { xs: 0, sm: 0, md: 300, lg: 300, xl: 300 },
                display: "flex",
                flexDirection: "column",
                padding: "16px",
              }}
            >
              <FilterComponent
                applyFilters={applyFilters}
                categories={categories}
                brands={brands}
                colors={colors}
                appliedFilters={appliedFilters}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={0} sm={0} md={0.5} lg={0.3}></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={8.7}
          sx={{ position: "relative" }}
        >
          <Box>
            {/* md and lg Filters*/}
            <Box
              sx={{
                mb: 5,
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                },
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{ mt: 2 }}
                data-aos="fade-right"
                data-aos-offset="50"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
              >
                <hr
                  style={{
                    background: "#7A73EA",
                    width: "40px",
                    height: "3px",
                    border: "none",
                  }}
                />
                <h2 style={{ fontWeight: "500" }}>SHOP ALL</h2>
              </Box>
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                    lg: "block",
                  },
                  mt: 2,
                }}
              >
                <Button
                  onClick={() => setSortMenu(!sortMenu)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <p style={{ fontWeight: "600" }}>SortBy</p>
                    <Sort />
                  </Box>
                </Button>
              </Box>
            </Box>
            <Collapse in={sortMenu} timeout="auto" unmountOnExit>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  justifyContent: "start",
                  alignItems: "start",
                  borderRadius: "3px",
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                }}
              >
                <ListItemButton onClick={() => handleSortByChange("default")}>
                  <ListItemText primary="Default" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleSortByChange("price-low-to-high")}
                >
                  <ListItemText primary="Price - Low to High" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleSortByChange("price-high-to-low")}
                >
                  <ListItemText primary="Price - High to Low" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleSortByChange("newest-first")}
                >
                  <ListItemText primary="Newest First" />
                </ListItemButton>
              </ListItem>
            </Collapse>
            {/* xs and sm Filters*/}
            <Box
              sx={{
                mb: 5,
                display: {
                  xs: "flex",
                  sm: "flex",
                  md: "none",
                  lg: "none",
                },
                flexDirection: "column",
                gap: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              data-aos="fade-down"
              data-aos-offset="50"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            >
              <hr
                style={{
                  background: "#7A73EA",
                  width: "40px",
                  height: "3px",
                  border: "none",
                }}
              />
              <h2 style={{ fontWeight: "500" }}>SHOP ALL</h2>
            </Box>
            <Box>
              <Box
                sx={{
                  display: {
                    xs: "flex",
                    sm: "flex",
                    md: "none",
                    lg: "none",
                    xl: "none",
                  },
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  height: "50px",
                }}
              >
                <ListItemButton
                  onClick={handleSortOpen}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <p style={{ fontWeight: "600" }}>SortBy</p>
                    <Sort />
                  </Box>
                </ListItemButton>
                <Divider orientation="vertical" variant="middle" flexItem />
                <ListItemButton
                  onClick={handleFilterOpen}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <p style={{ fontWeight: "600" }}>Filter</p>
                    <Tune />
                  </Box>
                </ListItemButton>
              </Box>
              <Collapse in={sortOpen} timeout="auto" unmountOnExit>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    justifyContent: "start",
                    alignItems: "start",
                    borderRadius: "3px",
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                    mt: 2,
                  }}
                >
                  <ListItemButton onClick={() => handleSortByChange("default")}>
                    <ListItemText primary="Default" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => handleSortByChange("price-low-to-high")}
                  >
                    <ListItemText primary="Price - Low to High" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => handleSortByChange("price-high-to-low")}
                  >
                    <ListItemText primary="Price - High to Low" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => handleSortByChange("newest-first")}
                  >
                    <ListItemText primary="Newest First" />
                  </ListItemButton>
                </ListItem>
              </Collapse>

              <Collapse in={filterOpen} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "row",
                    gap: 2,
                  }}
                >
                  <FilterComponent
                    applyFilters={applyFilters}
                    categories={categories}
                    brands={brands}
                    colors={colors}
                    appliedFilters={appliedFilters}
                  />
                </Box>
              </Collapse>
            </Box>
            <Grid
              container
              spacing={2}
              mt={2}
              sx={{ mb: { xs: 10, sm: 10, md: 10, lg: 0 } }}
            >
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 5,
                    width: "100%",
                    height: 500,
                  }}
                >
                  <Box className="loader" sx={{ color: "#ff5a5f" }}></Box>
                  <p style={{ fontSize: "13px", fontWeight: "300" }}>
                    Loading...
                  </p>
                </Box>
              ) : currentProducts.length > 0 ? (
                currentProducts.map((product) => {
                  const percentage =
                    ((product.previousPrice - product.offerPrice) /
                      product.previousPrice) *
                    100;
                  return (
                    <ProductCard
                      product={product}
                      percentage={percentage}
                      key={product.id}
                    />
                  );
                })
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    height: 500,
                  }}
                >
                  <Box
                    component="img"
                    src={filterNotfound}
                    alt="Empty Cart"
                    sx={{
                      width: { xs: 200, sm: 250, md: 300, lg: 300 },
                      height: { xs: 130, sm: 150, md: 180, lg: 180 },
                    }}
                  />
                  <p style={{ fontSize: "13px", fontWeight: "300" }}>
                    No products match the selected filters.
                  </p>
                </Box>
              )}
            </Grid>
            <Box
              sx={{
                position: "absolute",
                bottom: { xs: 0, sm: 0, md: 0, lg: 120 },
                display: "flex",
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "end",
                  lg: "end",
                },
                alignItems: "center",
                p: 1,
                width: "100%",
              }}
            >
              <Pagination
                count={Math.ceil(filteredProducts.length / productsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBack, next: ArrowForward }}
                    {...item}
                  />
                )}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductList;
