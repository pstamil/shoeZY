import React, { useEffect, useState } from "react";
import { db } from "../../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Box, Container, Grid, IconButton } from "@mui/material";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, setProducts } from "../../redux/Slices/productsSlice";
import { East, West } from "@mui/icons-material";

const PopulerProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(3);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const querySnapshot = await getDocs(productsCollection);

        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setProducts(productsData));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const popularProducts = products.filter((product) => product.rating >= 3.5);
  const totalPageCount = Math.ceil(popularProducts.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPageCount - 1 ? prevPage + 1 : prevPage
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };

  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setProductsPerPage(1);
      } else if (window.innerWidth < 960) {
        setProductsPerPage(2);
      } else if (window.innerWidth < 1200) {
        setProductsPerPage(2);
      } else {
        setProductsPerPage(3);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", mt: 5, mb: 10, bgcolor: "#F8F9FA" }}>
      <Container>
        <Box
          sx={{
            mb: 5,
            mt: 10,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
          data-aos="fade-down"
          data-aos-offset="100"
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
          <h1 style={{ fontWeight: "500" }}>Popular Products</h1>
        </Box>
        <Grid container spacing={2} mt={2} mb={5}>
          {popularProducts.length > 0 ? (
            popularProducts.slice(startIndex, endIndex).map((product) => {
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
                gap: 5,
                width: "100%",
                height: 390,
              }}
            >
              <Box className="loader" sx={{ color: "#ff5a5f" }}></Box>
              <p style={{ fontSize: "13px", fontWeight: "300" }}>Loading...</p>
            </Box>
          )}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mb: 10,
          }}
        >
          <IconButton
            onClick={prevPage}
            disabled={currentPage === 0}
            disableRipple
          >
            <West fontSize="large" />
          </IconButton>
          <IconButton
            onClick={nextPage}
            disabled={currentPage === totalPageCount - 1}
            disableRipple
          >
            <East fontSize="large" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default PopulerProduct;
