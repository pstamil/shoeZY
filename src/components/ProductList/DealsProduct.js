import React, { useEffect } from "react";
import { db } from "../../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Box, Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, setProducts } from "../../redux/Slices/productsSlice";
import time from "../../assets/time.jpg";
import { Link } from "react-router-dom";

const DealsProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

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

  const discount = 30;

  const discountedProducts = products.filter((product) => {
    const percentage =
      ((product.previousPrice - product.offerPrice) / product.previousPrice) *
      100;
    return percentage >= discount;
  });

  // Sort the discountedProducts
  discountedProducts.sort((a, b) => {
    const percentageA =
      ((a.previousPrice - a.offerPrice) / a.previousPrice) * 100;
    const percentageB =
      ((b.previousPrice - b.offerPrice) / b.previousPrice) * 100;
    return percentageB - percentageA;
  });

  // Top 9 products
  const top6DiscountedProducts = discountedProducts.slice(0, 9);

  return (
    <>
      <Container>
        <Box
          sx={{
            mb: 10,
            mt: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{ fontWeight: "500" }}
            data-aos="fade-down"
            data-aos-offset="50"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            Deals of the Week
          </h1>
          <Box
            sx={{ maxWidth: 500, textAlign: "center" }}
            data-aos="fade-down"
            data-aos-offset="50"
            data-aos-delay="50"
            data-aos-duration="1200"
            data-aos-easing="ease-in-out"
          >
            <span style={{ fontSize: "12px", color: "gray" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </Box>
        </Box>
        <Grid container mb={5}>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Grid container spacing={3}>
              {top6DiscountedProducts.length > 0 ? (
                top6DiscountedProducts.map((product) => {
                  return (
                    <Grid
                      item
                      key={product.id}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                      mb={2}
                      data-aos="fade-right"
                      data-aos-offset="0"
                      data-aos-delay="50"
                      data-aos-duration="1000"
                      data-aos-easing="ease-in-out"
                    >
                      <Link
                        to={`/shop/${product.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Box sx={{ bgcolor: "#E5E8EB", p: 2 }}>
                            <Box
                              component="img"
                              src={product.images[0]}
                              alt={product.name}
                              sx={{
                                width: 60,
                                height: 40,
                                mixBlendMode: "multiply",
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              flexWrap: "wrap",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "15px",
                                fontWeight: 400,
                                textTransform: "uppercase",
                              }}
                            >
                              {product.name.substring(0, 13).concat("...")}
                            </span>
                            <Box
                              sx={{ display: "flex", gap: 1, fontSize: "14px" }}
                            >
                              <span style={{ fontWeight: 500 }}>
                                ₹{product.offerPrice}
                              </span>
                              <span
                                style={{
                                  textDecoration: "line-through",
                                  color: "gray",
                                }}
                              >
                                ₹{product.previousPrice}
                              </span>
                            </Box>
                          </Box>
                        </Box>
                      </Link>
                    </Grid>
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
                    height: 500,
                  }}
                >
                  <Box className="loader" sx={{ color: "#00C194" }}></Box>
                  <p style={{ fontSize: "13px", fontWeight: "300" }}>
                    Loading...
                  </p>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid item xs={0} sm={0} md={3} lg={3}>
            <Box
              component="img"
              src={time}
              alt="LimitedTime"
              sx={{
                width: "100%",
                height: "100%",
                display: { xs: "none", sm: "none", md: "block", lg: "block" },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DealsProduct;
