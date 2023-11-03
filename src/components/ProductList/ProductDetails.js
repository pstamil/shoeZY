import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  Close,
  FlashOnOutlined,
  Person,
  ShoppingCartOutlined,
  Star,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Slices/cartSlice";
import reviewImg from "../../assets/review.svg";
import nike from "../../assets/brand_logos/nike.png";
import puma from "../../assets/brand_logos/puma.png";
import reebok from "../../assets/brand_logos/reebok.png";
import adidas from "../../assets/brand_logos/adidas.png";
import bata from "../../assets/brand_logos/bata.png";
import walkaroo from "../../assets/brand_logos/walkaroo.png";
import woodland from "../../assets/brand_logos/woodland.png";
import banner1 from "../../assets/banner1.jpg";

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

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [open, setOpen] = useState(false);
  const [proOpen, setProOpen] = useState(false);

  const handleProOpen = () => setProOpen(true);
  const hadleProClose = () => setProOpen(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, id }));
  };

  const [review, setReview] = useState({
    title: "",
    description: "",
  });

  const handleReviewChange = (event) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const submitReview = async (event) => {
    event.preventDefault();

    try {
      const reviewData = {
        title: review.title,
        description: review.description,
      };

      const reviewsCollection = collection(db, "products", id, "reviews");
      const newReviewDocRef = await addDoc(reviewsCollection, reviewData);
      setReviews((prevReviews) => [
        ...prevReviews,
        { id: newReviewDocRef.id, ...reviewData },
      ]);

      setReview({
        title: "",
        description: "",
      });
      setReviewModalOpen(false);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  useEffect(() => {
    //Fetch products
    const fetchProduct = async () => {
      try {
        const productDocRef = doc(db, "products", id);
        const productDoc = await getDoc(productDocRef);

        if (productDoc.exists()) {
          setProduct(productDoc.data());
        } else {
          console.log("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();

    //Fetch reviews
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, "products", id, "reviews");
        const q = query(reviewsCollection);

        const querySnapshot = await getDocs(q);
        const reviewsData = [];

        querySnapshot.forEach((doc) => {
          reviewsData.push(doc.data());
        });

        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  const calculateDiscountPercentage = (product) => {
    const discountPercentage =
      ((product.previousPrice - product.offerPrice) / product.previousPrice) *
      100;
    return discountPercentage.toFixed(0);
  };

  // Open the review modal
  const handleReviewModalOpen = () => {
    setReviewModalOpen(true);
  };

  //Close the review modal
  const handleReviewModalClose = () => {
    setReviewModalOpen(false);
  };

  //GET MONTH AND DATE
  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "short" });
  const day = currentDate.getDate();

  if (!product) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: 500,
            mt: 18,
            gap: 7,
          }}
        >
          <Box className="loader" sx={{ color: "#ff5a5f" }}></Box>
          <p style={{ fontSize: "13px", fontWeight: "300" }}>
            Product details loading...
          </p>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Box>
        <Box
          sx={{
            width: "100%",
            backgroundImage: `url(${banner1})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: { xs: "40vh", sm: "40vh", md: "45vh", lg: "50vh" },
            position: "relative",
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
              PRODUCT DETAILS
            </Typography>
            <Breadcrumbs
              separator="/"
              aria-label="breadcrumb"
              sx={{
                fontSize: { xs: "16px", sm: "20px", md: "22px", lg: "22px" },
                color: "white",
                ml: { xs: 0, sm: 9, md: 9, lg: 9 },
                mt: 2,
              }}
              data-aos="fade-right"
              data-aos-offset="100"
              data-aos-delay="50"
              data-aos-duration="1300"
              data-aos-easing="ease-in-out"
            >
              <RouterLink
                to="/"
                style={{ textDecoration: "none", color: "#FF5A5F" }}
              >
                Home
              </RouterLink>
              <RouterLink
                to="/shop"
                style={{ textDecoration: "none", color: "#FF5A5F" }}
              >
                Shop
              </RouterLink>
            </Breadcrumbs>
          </Box>
        </Container>
      </Box>
      <Container>
        <Grid
          container
          mt={7}
          mb={5}
          sx={{
            padding: "40px",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            position: "relative",
          }}
        >
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box
              sx={{
                bgcolor: "white",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={product.images}
                alt={product.name}
                sx={{
                  width: { xs: "220px", sm: "400px", md: "90%", lg: "90%" },
                  height: { xs: 150, sm: 250, md: 200, lg: 200 },
                }}
                data-aos="zoom-in"
                data-aos-offset="50"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bgcolor: "#FF5A5F",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "30px",
                color: "white",
                p: "2px 0",
                left: { xs: 0, sm: 40, md: 40, lg: 50 },
              }}
            >
              <Star fontSize="small" />

              <span>{product.rating}</span>
            </Box>
          </Grid>
          <Grid item xs={0} sm={0} md={1} lg={1} xl={1}></Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mt: { xs: 3, sm: 3, md: 0, lg: 0 },
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  textTransform: "uppercase",
                  fontWeight: "500",
                  color: "gray",
                }}
              >
                {product.brand}
              </span>
              <h2 style={{ fontSize: "20px", fontWeight: "500" }}>
                {product.name}
              </h2>
              <Box
                sx={{
                  width: "80px",
                  height: "40px",
                  position: "absolute",
                  top: 20,
                  right: 20,
                  display: {
                    xs: "none",
                    sm: "block",
                    md: "block",
                    lg: "block",
                  },
                }}
                component="img"
                src={
                  (product.brand === "Adidas" && adidas) ||
                  (product.brand === "Nike" && nike) ||
                  (product.brand === "Puma" && puma) ||
                  (product.brand === "Reebok" && reebok) ||
                  (product.brand === "Bata" && bata) ||
                  (product.brand === "Walkaroo" && walkaroo) ||
                  (product.brand === "Woodland" && woodland)
                }
                alt={product.brand}
              />
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {product.colors.map((color, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "18px",
                      height: "18px",
                      bgcolor: color,
                      border: color === "White" ? "1px solid gray" : "none",
                    }}
                  ></Box>
                ))}
              </Box>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <h2 style={{ fontWeight: "600" }}>₹ {product.offerPrice}</h2>

                <p
                  style={{
                    textDecoration: "line-through",
                    color: "gray",
                  }}
                >
                  ₹{product.previousPrice}
                </p>
                <span
                  style={{
                    color: "green",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {calculateDiscountPercentage(product)}%off
                </span>
              </Box>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <span style={{ color: "blue", fontSize: "13px" }}>
                  Be the first to Review this product
                </span>
                {reviews && (
                  <span style={{ fontSize: "13px" }}>
                    ({reviews.length} review
                    {reviews.length > 1 ? "s" : ""})
                  </span>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <span>
                    Delivery by {day} {month}, Thursday
                  </span>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <span style={{ color: "green" }}>
                    Free{" "}
                    <span
                      style={{ color: "gray", textDecoration: "line-through" }}
                    >
                      ₹{product.deliveryCharge}
                    </span>
                  </span>
                </Box>
                <Link
                  onClick={handleOpen}
                  style={{
                    color: "blue",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </Link>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                    md: "row",
                    lg: "row",
                  },
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartOutlined />}
                  onClick={() => handleAddToCart(product)}
                  color="secondary"
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Add to cart
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<FlashOnOutlined />}
                  onClick={() => {
                    handleAddToCart(product);
                    navigate("/shop/cart");
                  }}
                  sx={{
                    textTransform: "none",
                    color: "white",
                  }}
                >
                  Buy
                </Button>
              </Box>
              <Divider sx={{ mt: 3, mb: 1 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  gap: 2,
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                    md: "row",
                    lg: "row",
                  },
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  onClick={handleProOpen}
                >
                  View Product Deatails
                </Button>
                <Button
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  onClick={handleReviewModalOpen}
                >
                  Add your Review
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} mt={1}>
            <Box>
              <Box mt={1} mb={5}>
                <Divider>
                  <h2>Customer Reviews</h2>
                </Divider>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                  padding: "20px 20px",
                }}
              >
                {reviews ? (
                  reviews.length > 0 ? (
                    <>
                      {reviews.map((review, index) => (
                        <List key={index}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <Person />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={review.title}
                              secondary={review.description}
                            />
                          </ListItem>
                        </List>
                      ))}
                    </>
                  ) : (
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
                          height: "40vh",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          <Box
                            component="img"
                            src={reviewImg}
                            alt="review"
                            sx={{
                              width: { xs: 160, sm: 170, md: 200, lg: 200 },
                              height: { xs: 120, sm: 130, md: 150, lg: 150 },
                            }}
                          />
                          <p style={{ fontSize: "13px", fontWeight: "400" }}>
                            No reviews available for this product!!
                          </p>
                          <Button
                            size="small"
                            sx={{ color: "#00BFA6" }}
                            onClick={handleReviewModalOpen}
                          >
                            Add Review
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  )
                ) : (
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
                        height: "40vh",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          gap: 5,
                          width: "100%",
                        }}
                      >
                        <Box className="loader" sx={{ color: "#00C194" }}></Box>
                        <p style={{ fontSize: "13px", fontWeight: "400" }}>
                          Loading reviews...
                        </p>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Delivery details modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <span style={{ fontSize: "22px", fontWeight: "bold" }}>
            Delivery & Installation details
          </span>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              height: "30px",
              alignItems: "center",
              mb: 2,
            }}
          >
            <span>Delivery by2 Nov, Thursday</span>
            <Divider orientation="vertical" variant="middle" flexItem />
            <span style={{ color: "green" }}>
              Free{" "}
              <span style={{ color: "gray", textDecoration: "line-through" }}>
                ₹{product.deliveryCharge}
              </span>
            </span>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <li style={{ fontSize: "14px" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li style={{ fontSize: "14px" }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              excepturi aperiam repudiandae et iure nostrum.
            </li>
          </Box>
          <Link
            onClick={handleClose}
            style={{ color: "black", cursor: "pointer" }}
          >
            <Box sx={{ position: "absolute", top: 10, right: 10 }}>
              <Close />
            </Box>
          </Link>
        </Box>
      </Modal>

      {/* Review modal */}
      <Modal open={isReviewModalOpen} onClose={handleReviewModalClose}>
        <Box sx={style}>
          <h2>Add your Review</h2>
          <form onSubmit={submitReview}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="title"
              label="Review Title"
              value={review.title}
              onChange={handleReviewChange}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={3}
              name="description"
              placeholder="How is the product? What do you like? What do you hate?"
              value={review.description}
              onChange={handleReviewChange}
              sx={{ mt: 2 }}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
          <Link
            onClick={handleReviewModalClose}
            style={{ color: "black", cursor: "pointer" }}
          >
            <Box sx={{ position: "absolute", top: 10, right: 10 }}>
              <Close />
            </Box>
          </Link>
        </Box>
      </Modal>
      {/* Product details modal */}
      <Modal open={proOpen} onClose={hadleProClose}>
        <Box mt={3} sx={style}>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 3, sm: 15, md: 15, lg: 15 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                fontSize: "14px",
                color: "gray",
              }}
            >
              <span>Colors</span>
              <span>Brand</span>
              <span>Model name</span>
              <span>Ideal for</span>
              <span>Shoe Type</span>
              <span>Care instructions</span>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                fontSize: "14px",
              }}
            >
              <span>{product.colors.join(", ")}</span>
              <span>{product.brand}</span>
              <span>{product.name}</span>
              <span>
                {product.idealFor === "Both"
                  ? "Men and Women"
                  : product.idealFor}
              </span>
              <span>{product.category}</span>
              <span>Wipe with a clean,dry cloth</span>
            </Box>
          </Box>
          <Box mt={4} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={{ color: "gray", fontWeight: "bold" }}>
              Product description:
            </span>
            <span style={{ fontSize: "13px" }}>{product.description}</span>
          </Box>
          <Link
            onClick={hadleProClose}
            style={{ color: "black", cursor: "pointer" }}
          >
            <Box sx={{ position: "absolute", top: 10, right: 10 }}>
              <Close />
            </Box>
          </Link>
        </Box>
      </Modal>
    </>
  );
}

export default ProductDetails;
