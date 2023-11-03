import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
} from "../../redux/Slices/cartSlice";
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Add, Close, Remove, Star } from "@mui/icons-material";
import emptyCart from "../../assets/emptyCart.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import banner1 from "../../assets/banner1.jpg";

const Cart = () => {
  const cartProducts = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //alculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartProducts.forEach((product) => {
      totalPrice += product.offerPrice * product.quantity;
    });
    return totalPrice;
  };

  // Calculate item prices
  const itemPrices = cartProducts.map(
    (product) => product.offerPrice * product.quantity
  );

  const totalPrice = itemPrices.reduce((total, price) => total + price, 0);

  const totalOriginalPrice = cartProducts.reduce(
    (total, product) => total + product.previousPrice * product.quantity,
    0
  );

  const totalDeliveryCharges = cartProducts.reduce((total, product) => {
    return total + product.deliveryCharge * product.quantity;
  }, 0);

  const totalDiscount = totalOriginalPrice - totalPrice;

  const totalSavedMoney = totalDiscount + totalDeliveryCharges;

  const calculateDiscountPercentage = (product) => {
    const discountPercentage =
      ((product.previousPrice - product.offerPrice) / product.previousPrice) *
      100;
    return discountPercentage.toFixed(0);
  };

  const removeProductFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlaceOrder = () => {
    if (cartProducts.length > 0) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const productsWithQuantity = cartProducts.map((product) => ({
            ...product,
            quantity: product.quantity,
          }));

          navigate("/shop/cart/checkout", {
            state: {
              cartProducts: productsWithQuantity,
              totalAmount: calculateTotalPrice(),
            },
          });
        } else {
          alert("Please log in to place an order.");
          console.log(
            "User is not logged in. Please log in to place an order."
          );
        }
      });
    } else {
      console.log("Empty cart");
    }
  };

  //GET MONTH AND DATE
  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "short" });
  const day = currentDate.getDate();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundImage: `url(${banner1})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: { xs: "40vh", sm: "40vh", md: "45vh", lg: "50vh" },
          position: "relative",
          mb: 5,
        }}
      ></Box>
      <Container>
        <Box
          sx={{
            padding: "20px 0",
            position: "absolute",
            top: { xs: 160, sm: 160, md: 180, lg: 160 },
            ml: { xs: 0, sm: 10, md: 10, lg: 20 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "30px", sm: "35px", md: "40px", lg: "40px" },
              color: "white",
              fontWeight: 500,
            }}
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            SHOPPING CART
          </Typography>
          <Breadcrumbs
            separator="/"
            aria-label="breadcrumb"
            sx={{
              fontSize: { xs: "16px", sm: "20px", md: "22px", lg: "22px" },
              color: "white",
              ml: { xs: 0, sm: 5, md: 5, lg: 5 },
              mt: 2,
            }}
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="1300"
            data-aos-easing="ease-in-out"
          >
            <Link to="/" style={{ textDecoration: "none", color: "#FF5A5F" }}>
              Home
            </Link>
            <Link
              to="/shop"
              style={{ textDecoration: "none", color: "#FF5A5F" }}
            >
              Shop
            </Link>
            <p style={{ color: "#FF5A5F" }}>Cart</p>
          </Breadcrumbs>
        </Box>
      </Container>
      <Container>
        {cartProducts.length === 0 ? (
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box
                  component="img"
                  src={emptyCart}
                  alt="Empty Cart"
                  sx={{
                    width: { xs: 250, sm: 300, md: 350, lg: 350 },
                    height: { xs: 150, sm: 200, md: 220, lg: 220 },
                  }}
                />
                <p style={{ fontSize: "20px", fontWeight: "500" }}>
                  Your cart is Empty?
                </p>
                <Link
                  to="/shop"
                  style={{
                    textDecoration: "none",
                    background: "#7A73EA",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  Back To Shop
                </Link>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container mt={3} mb={10}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={7.8}
              xl={7.8}
              sx={{
                padding: "10px 0 0 0",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
            >
              {cartProducts.map((product) => (
                <Box key={product.id}>
                  <NavLink
                    to={`/shop/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Grid container sx={{ position: "relative" }}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          m: {
                            xs: "20px 0",
                            sm: "20px 0",
                            md: "20px 0",
                            lg: "0",
                          },
                        }}
                      >
                        <img
                          style={{ height: 120, width: "13rem" }}
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </Grid>
                      <Box
                        sx={{
                          position: "absolute",
                          top: -10,
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
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          color: "black",
                        }}
                      >
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <span
                                style={{
                                  fontWeight: "bold",
                                  color: "gray",
                                  textTransform: "uppercase",
                                }}
                              >
                                {product.brand}
                              </span>
                              <span
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                              >
                                {product.name}
                              </span>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              height: "30px",
                              alignItems: "center",
                            }}
                          >
                            <span style={{ fontSize: "13px" }}>
                              Delivery by {day} {month}, Thursday
                            </span>
                            <Divider
                              orientation="vertical"
                              variant="middle"
                              flexItem
                            />
                            <span style={{ color: "green" }}>
                              <span
                                style={{
                                  color: "gray",
                                  textDecoration: "line-through",
                                }}
                              >
                                ₹{product.deliveryCharge}
                              </span>{" "}
                              Free
                            </span>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                              justifyContent: "start",
                              mt: "7px",
                            }}
                          >
                            <span
                              style={{
                                color: "black",
                                fontWeight: "600",
                                fontSize: "20px",
                              }}
                            >
                              ₹ {product.offerPrice * product.quantity}
                            </span>
                            <span
                              style={{
                                textDecoration: "line-through",
                                color: "gray",
                              }}
                            >
                              ₹{product.previousPrice * product.quantity}
                            </span>
                            <span
                              style={{
                                color: "green",
                                fontSize: "13px",
                                fontWeight: "600",
                              }}
                            >
                              {calculateDiscountPercentage(product)}%off
                            </span>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <span style={{ color: "gray", marginTop: "1px" }}>
                              Colors:
                            </span>
                            {product.colors.map((color, index) => (
                              <Box
                                key={index}
                                sx={{
                                  width: "16px",
                                  height: "16px",
                                  bgcolor: color,
                                  border:
                                    color === "White"
                                      ? "1px solid gray"
                                      : "none",
                                  borderRadius: "50%",
                                }}
                              ></Box>
                            ))}
                          </Box>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </NavLink>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      m: {
                        xs: "0 15px 0 15px",
                        sm: "0 15px 0 15px",
                        md: "0 20px 0 30px",
                        lg: "0 20px 0 30px",
                        xl: "0 20px 0 30px",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        padding: "10px 0",
                        gap: 2,
                      }}
                    >
                      <ButtonGroup
                        variant="outlined"
                        sx={{ border: "1px solid #7A73EA" }}
                      >
                        <Button
                          onClick={() => dispatch(decreaseQuantity(product))}
                          sx={{
                            color: "black",
                            border: "none",
                            "&:hover": {
                              bgcolor: "#7A73EA",
                              color: "white",
                              border: "none",
                            },
                          }}
                        >
                          <Remove sx={{ fontSize: "18px" }} />
                        </Button>
                        <Box
                          sx={{
                            borderLeft: "0.1px solid #7A73EA",
                            borderRight: "0.1px solid #7A73EA",
                            width: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {product.quantity}
                        </Box>
                        <Button
                          onClick={() => dispatch(increaseQuantity(product))}
                          sx={{
                            color: "black",
                            border: "none",
                            "&:hover": {
                              bgcolor: "#7A73EA",
                              color: "white",
                              border: "none",
                            },
                          }}
                        >
                          <Add sx={{ fontSize: "18px" }} />
                        </Button>
                      </ButtonGroup>
                    </Box>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ textTransform: "none" }}
                      endIcon={<Close />}
                      onClick={() => removeProductFromCart(product)}
                    >
                      Remove
                    </Button>
                  </Box>
                  <Divider variant="middle" sx={{ mt: 2, mb: 2 }} />
                </Box>
              ))}
              <Box
                sx={{
                  display: "flex",
                  padding: "20px 20px",
                  width: "100%",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                    md: "row",
                    lg: "row",
                  },
                  gap: 2,
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClearCart}
                    sx={{
                      textTransform: "none",
                      width: "100%",
                    }}
                  >
                    Clear Cart
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      textTransform: "none",
                      width: "100%",
                    }}
                    onClick={handlePlaceOrder}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={0} sm={0} md={0} lg={0.2} xl={0.2} mt={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Box
                sx={{
                  width: {
                    lg: "380px",
                    xl: "380px",
                  },
                  mt: { xs: 3, sm: 3, md: 3, lg: 0, xl: 0 },
                }}
              >
                <Box
                  sx={{
                    padding: "20px 30px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
                  }}
                >
                  <span style={{ color: "gray", fontSize: "20px" }}>
                    CART TOTALS
                  </span>
                  <Divider sx={{ mt: 1 }} />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        Price ({cartProducts.length} item
                        {cartProducts.length > 1 ? "s" : ""})
                      </span>
                      <span>₹{totalOriginalPrice}</span>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Discount</span>
                      <span style={{ color: "green" }}>-₹{totalDiscount}</span>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      <span>Delivery Charges</span>
                      <span style={{ color: "green" }}>
                        Free{" "}
                        <span
                          style={{
                            color: "gray",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{totalDeliveryCharges}
                        </span>
                      </span>
                    </Box>
                    <Divider />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <span style={{ fontWeight: "600", fontSize: "18px" }}>
                      Total
                    </span>
                    <span style={{ fontWeight: "600", fontSize: "18px" }}>
                      ₹ {calculateTotalPrice()}
                    </span>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: 3,
                    p: "20px 0 20px 30px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
                  }}
                >
                  <span style={{ color: "green" }}>
                    You will save ₹{totalSavedMoney} on this order !!
                  </span>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Cart;
