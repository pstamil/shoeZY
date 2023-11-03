import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase/Firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
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
  Modal,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import { ArrowBack, ArrowForward, Sort, Tune } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  setProducts,
} from "../../../../redux/Slices/productsSlice";

import filterNotfound from "../../../../assets/filterNotfound.svg";
import ProductTable from "./ProductTable";
import AllProductFilter from "./AllProductFilter";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  minWidth: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AllProducts = () => {
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

  const [confirm, setConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  //Delete confirmation
  const confirmDelete = (id) => {
    setConfirm(true);
    setDeleteId(id);
    console.log(id);
  };

  const handleModalclose = () => {
    setConfirm(false);
  };

  //DELETE DATA
  const handleDelete = async () => {
    await deleteDoc(doc(db, "products", deleteId));
    setConfirm(false);
    if (products.length === 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container>
      <Grid container sx={{ mt: 15, mb: 7 }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box>
            <Box
              sx={{
                mb: 5,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              <hr
                style={{
                  background: "#7A73EA",
                  width: "40px",
                  height: "3px",
                  border: "none",
                }}
              />
              <h1 style={{ fontWeight: "500" }}>ALL PRODUCTS</h1>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
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
                    flexDirection: "row",
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
                    borderRadius: "3px",
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                    mt: 2,
                  }}
                >
                  <AllProductFilter
                    applyFilters={applyFilters}
                    categories={categories}
                    brands={brands}
                    colors={colors}
                    appliedFilters={appliedFilters}
                  />
                </Box>
              </Collapse>
            </Box>
            <Grid container spacing={2} mt={2} mb={5}>
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
                  <Box className="loader" sx={{ color: "#00C194" }}></Box>
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
                    <ProductTable
                      product={product}
                      percentage={percentage}
                      key={product.id}
                      confirmDelete={confirmDelete}
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
                width: "100%",
                mb: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                count={Math.ceil(filteredProducts.length / productsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                size="large"
                sx={{
                  mt: 2,
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
      <Modal open={confirm} onClose={handleModalclose}>
        <Box sx={style}>
          <Typography variant="h6">
            Are you sure to delete this product ?
          </Typography>
          <Divider sx={{ mt: 1, mb: 3 }} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button onClick={handleDelete} variant="contained" color="error">
              Confirm
            </Button>
            <Button
              onClick={handleModalclose}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default AllProducts;
