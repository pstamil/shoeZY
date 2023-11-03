import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  Modal,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { clearCart } from "../../redux/Slices/cartSlice";
import { useDispatch } from "react-redux";
import successGif from "../../assets/success.gif";
import banner1 from "../../assets/banner1.jpg";
import CreditCard from "./CreditCard";
import paytm from "../../assets/upilogos/paytm.png";
import phonepe from "../../assets/upilogos/phonepe.png";
import gpay from "../../assets/upilogos/gpay.png";

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

const Checkout = () => {
  const location = useLocation();
  const { cartProducts, totalAmount } = location.state;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    stateCountry: "",
    postalZip: "",
    emailAddress: "",
    phone: "",
    orderNotes: "",
    coupon: "",
    payment: "",
    paymentData: {},
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "payment") {
      setFormData({
        ...formData,
        [name]: value,
        paymentData: {
          ...formData.paymentData,
          value: "",
        },
      });
    } else if (name === "paymentData") {
      setFormData({
        ...formData,
        paymentData: {
          ...formData.paymentData,
          value,
          mode: formData.payment,
        },
      });
    }
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      stateCountry: "",
      postalZip: "",
      emailAddress: "",
      phone: "",
      orderNotes: "",
      coupon: "",
      payment: "",
      paymentData: {
        mode: "",
        value: "",
      },
    });
  };

  const [formErrors, setFormErrors] = useState({});
  const [shippingAdd, setShippingAdd] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.address1.trim()) {
      errors.address1 = "Address is required";
    }

    if (!formData.stateCountry.trim()) {
      errors.stateCountry = "State/Country is required";
    }

    if (!formData.postalZip.trim()) {
      errors.postalZip = "Postal/Zip code is required";
    } else if (!/^\d{6}$/.test(formData.postalZip)) {
      errors.postalZip = "Invalid postal/zip code format";
    }
    if (!formData.emailAddress.trim()) {
      errors.emailAddress = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.emailAddress)) {
      errors.emailAddress = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must have 10 digits";
    }
    if (!formData.payment) {
      errors.payment = "Select payment mode";
      alert(errors.payment);
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Shipping Address:", formData);
      setModalOpen(true);
      setShippingAdd(formData);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [isPayOpen, setPayOpen] = useState(false);
  const [isOrderPlaced, setOrderPlaced] = useState(false);

  const handleConfirmOrder = () => {
    setModalOpen(false);
    if (shippingAdd.payment === "Debit/Credit") {
      setPayOpen(true);
    } else if (shippingAdd.payment === "UPI") {
      setPayOpen(true);
    } else {
      setOrderPlaced(true);
      formData.paymentData.value = "COD Payment";
      formData.paymentData.mode = formData.payment;
      console.log("Order details:", formData);
      console.log("Order successfully placed - COD Payment");
      dispatch(clearCart());
      setPayOpen(false);
      clearForm();
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handlePayModal = () => {
    setPayOpen(false);
  };

  const upiPayConfirm = () => {
    const errors = {};
    if (!formData.paymentData.value) {
      setIsProcessing(false);
      errors.payment = "Select a UPI payment method";
      alert(errors.payment);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setOrderPlaced(true);
        formData.paymentData.mode = formData.payment;
        console.log("Order details:", formData);
        console.log("Payment successful");
        dispatch(clearCart());
        setPayOpen(false);
        clearForm();
      }, 3000);
    }
  };

  const PaymentConfirm = (cardDta) => {
    setIsProcessing(true);
    setTimeout(() => {
      setOrderPlaced(true);
      dispatch(clearCart());
      setPayOpen(false);
      formData.paymentData.value = cardDta;
      formData.paymentData.mode = formData.payment;
      console.log("Order details:", formData);
      console.log("Payment successful");
      clearForm();
    }, 3000);
  };
  //console.log(cartProducts);
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
            top: { xs: 190, sm: 190, md: 180, lg: 160 },
            ml: { xs: 0, sm: 0, md: 10, lg: 20 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "30px", sm: "35px", md: "40px", lg: "40px" },
              color: "white",
              fontWeight: 500,
              ml: { xs: 0, sm: 0, md: 8, lg: 8 },
            }}
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            CHECKOUT
          </Typography>
          <Breadcrumbs
            separator="/"
            aria-label="breadcrumb"
            sx={{
              fontSize: { xs: "16px", sm: "20px", md: "22px", lg: "22px" },
              color: "white",
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
            <Link
              to="/shop/cart"
              style={{ textDecoration: "none", color: "#FF5A5F" }}
            >
              Cart
            </Link>
            <p style={{ color: "#FF5A5F" }}>Checkout</p>
          </Breadcrumbs>
        </Box>
      </Container>
      <Box mb={10}>
        {isOrderPlaced ? (
          <Grid container mt={3}>
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
                height: "60vh",
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
                  src={successGif}
                  alt="Order placed"
                  sx={{ width: 50, height: 50 }}
                />
                <p style={{ fontSize: "20px", fontWeight: "500" }}>
                  Order Placed Successfully!
                </p>
                <Link
                  to="/shop"
                  style={{
                    textDecoration: "none",
                    background: "#7A73EA",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    color: "white",
                    marginTop: "10px",
                  }}
                >
                  Back To Shop
                </Link>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Container>
            <Box
              sx={{
                width: "100%",
                bgcolor: "#E5E8EB",
                height: 50,
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: 1,
                pl: { xs: 1, sm: 3, md: 3, lg: 3 },
                fontSize: "13px",
              }}
            >
              <span>Returning customer?</span>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#FF5A5F",
                }}
              >
                Click here to login
              </Link>
            </Box>
            <Box mt={6}>
              <h2 style={{ fontWeight: "400" }}>Billing Details</h2>
            </Box>
            <Grid container mt={3}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box
                  component="form"
                  sx={{
                    border: "0.5px solid #E5E8EB",
                    p: {
                      xs: "0px 15px 10px 15px",
                      sm: "5px 20px",
                      md: "10px 30px",
                      lg: "20px 40px",
                    },
                  }}
                >
                  <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <p style={{ fontSize: "14px" }}>
                        First Name<span style={{ color: "red" }}>*</span>
                      </p>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter first name"
                        sx={{ mt: 1 }}
                        name="firstName"
                        color="secondary"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formErrors.firstName}
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <p style={{ fontSize: "14px" }}>
                        Last Name<span style={{ color: "red" }}>*</span>
                      </p>
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        placeholder="Enter last name"
                        sx={{ mt: 1 }}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formErrors.lastName}
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <p style={{ fontSize: "14px" }}>
                        Address<span style={{ color: "red" }}>*</span>
                      </p>
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        placeholder="Door no,Apartment name,etc."
                        sx={{ mt: 1 }}
                        name="address1"
                        value={formData.address1}
                        onChange={handleInputChange}
                        required
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formErrors.address1}
                      </span>
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        placeholder="Street address"
                        sx={{ mt: 2 }}
                        name="address2"
                        value={formData.address2}
                        onChange={handleInputChange}
                        required
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formErrors.address2}
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <p style={{ fontSize: "14px" }}>
                        State / Country<span style={{ color: "red" }}>*</span>
                      </p>
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        placeholder="State / country"
                        sx={{ mt: 1 }}
                        name="stateCountry"
                        value={formData.stateCountry}
                        onChange={handleInputChange}
                        required
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formErrors.stateCountry}
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <p style={{ fontSize: "14px" }}>
                        Postal / Zip<span style={{ color: "red" }}>*</span>
                      </p>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        color="secondary"
                        placeholder="Postal / zip code"
                        sx={{ mt: 1 }}
                        name="postalZip"
                        value={formData.postalZip}
                        onChange={handleInputChange}
                        required
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formErrors.postalZip}
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <p style={{ fontSize: "14px" }}>
                        Email Address<span style={{ color: "red" }}>*</span>
                      </p>
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        placeholder="Enter email address"
                        sx={{ mt: 1 }}
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        required
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formErrors.emailAddress}
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <p style={{ fontSize: "14px" }}>
                        Phone<span style={{ color: "red" }}>*</span>
                      </p>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        color="secondary"
                        placeholder="Phone number"
                        sx={{ mt: 1 }}
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formErrors.phone}
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <p style={{ fontSize: "14px" }}>Order Notes</p>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        color="secondary"
                        placeholder="Write your notes here..."
                        size="small"
                        sx={{ mt: 1 }}
                        name="orderNotes"
                        value={formData.orderNotes}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={0} sm={0} md={1} lg={1} xl={1}></Grid>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                <Box sx={{ mt: { xs: 5, sm: 5, md: 0, lg: 0 } }}>
                  <h2 style={{ fontWeight: "400" }}>Coupon Code</h2>
                </Box>
                <Box
                  sx={{
                    border: "0.5px solid #E5E8EB",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    flexDirection: "column",
                    gap: 2,
                    height: 180,
                    p: { xs: 2, sm: 5, md: 5, lg: 5 },
                    mt: 2,
                  }}
                >
                  <p style={{ fontSize: "13px" }}>
                    Enter your coupon code if you have one
                  </p>
                  <ButtonGroup>
                    <TextField
                      fullWidth
                      name="coupon"
                      placeholder="Coupon Code"
                      size="small"
                      value={formData.coupon}
                      onChange={handleInputChange}
                    />
                    <Button variant="contained" sx={{ width: 100 }}>
                      Apply
                    </Button>
                  </ButtonGroup>
                </Box>
                <Box sx={{ mt: 5, mb: 3 }}>
                  <h2 style={{ fontWeight: "400" }}>Your Order</h2>
                </Box>
                <Box
                  sx={{
                    border: "0.5px solid #E5E8EB",
                    padding: "40px",
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h5 style={{ fontSize: "16px", fontWeight: 500 }}>
                      Product
                    </h5>
                    <h5 style={{ fontSize: "16px", fontWeight: 500 }}>Total</h5>
                  </Box>
                  <Divider sx={{ mt: 2 }} />
                  {cartProducts.map((product) => (
                    <Box key={product.id}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <p style={{ fontSize: "14px" }}>
                          {product.name}
                          <span
                            style={{
                              color: "#7A73EA",
                              fontWeight: 600,
                              fontSize: "12px",
                            }}
                          >
                            &nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;{product.quantity}
                          </span>
                        </p>
                        <p style={{ fontSize: "14px" }}>
                          ₹{(product.offerPrice * product.quantity).toFixed(2)}
                        </p>
                      </Box>
                      <Divider sx={{ mt: 2 }} />
                    </Box>
                  ))}
                  <FormControl>
                    <FormLabel
                      sx={{
                        fontSize: "16px",
                        fontWeight: 500,
                        mt: 2,
                        mb: 1,
                        color: "black",
                      }}
                    >
                      Payment:
                    </FormLabel>
                    <RadioGroup
                      row
                      name="payment"
                      value={formData.payment}
                      onChange={handleInputChange}
                    >
                      <FormControlLabel
                        value="COD"
                        control={<Radio size="small" />}
                        label="COD"
                      />
                      <FormControlLabel
                        value="UPI"
                        control={<Radio size="small" />}
                        label="UPI"
                      />
                      <FormControlLabel
                        value="Debit/Credit"
                        control={<Radio size="small" />}
                        label="Debit/Credit"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ mt: 2 }} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                    <h5 style={{ fontSize: "16px", fontWeight: 500 }}>
                      Order Total
                    </h5>
                    <h5 style={{ fontSize: "16px", fontWeight: 500 }}>
                      ₹ {totalAmount.toFixed(2)}
                    </h5>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ mt: 5, width: "100%" }}
                    onClick={handlePlaceOrder}
                  >
                    Place order
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        )}

        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle>Confirm Order</DialogTitle>
          <DialogContent>
            <Box>
              <span style={{ fontWeight: 600 }}>Shipping Address</span>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  fontSize: "12px",
                  mt: 1,
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <span style={{ fontWeight: "bold" }}>Name:</span>
                  <span>
                    {shippingAdd.firstName} {shippingAdd.lastName}
                  </span>
                </Box>

                <span>
                  {shippingAdd.address1},{shippingAdd.address2},
                  {shippingAdd.stateCountry} - {shippingAdd.postalZip}
                </span>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                      md: "row",
                      lg: "row",
                    },
                  }}
                >
                  <Box>
                    <span style={{ fontWeight: "bold" }}>Phone: </span>
                    <span> {shippingAdd.phone}</span>
                  </Box>
                  <Box>
                    <span style={{ fontWeight: "bold" }}>Email:</span>
                    <span> {shippingAdd.emailAddress}</span>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  mb: 2,
                }}
              >
                <h5 style={{ fontSize: "16px", fontWeight: 500 }}>
                  PAYMENT MODE
                </h5>
                <span></span>
                <h5 style={{ fontSize: "16px", fontWeight: 500 }}>
                  {shippingAdd.payment}
                </h5>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  mb: 2,
                }}
              >
                <h5 style={{ fontSize: "16px", fontWeight: 500 }}>
                  ORDER TOTAL
                </h5>
                <h5 style={{ fontSize: "16px", fontWeight: 500 }}>
                  ₹ {totalAmount.toFixed(2)}
                </h5>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={handleConfirmOrder}
                disabled={isOrderPlaced}
              >
                Order
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
        {shippingAdd.payment === "Debit/Credit" && isPayOpen && (
          <Modal open={isPayOpen} onClose={handlePayModal}>
            <Box mt={3} sx={style}>
              <CreditCard
                PaymentConfirm={PaymentConfirm}
                totalAmount={totalAmount}
                isProcessing={isProcessing}
              />
            </Box>
          </Modal>
        )}
        {shippingAdd.payment === "UPI" && isPayOpen && (
          <Modal open={isPayOpen} onClose={handlePayModal}>
            <Box mt={3} sx={style}>
              <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
                <FormControl>
                  <FormLabel
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      mt: 2,
                      mb: 1,
                      color: "black",
                    }}
                  >
                    UPI Payment:
                  </FormLabel>
                  <RadioGroup
                    row
                    name="paymentData"
                    value={formData.paymentData.value}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="gpay"
                      control={<Radio size="small" />}
                      label={
                        <Box
                          component="img"
                          src={gpay}
                          alt="gapy"
                          sx={{ width: 50, height: 50 }}
                        />
                      }
                    />
                    <FormControlLabel
                      value="paytm"
                      control={<Radio size="small" />}
                      label={
                        <Box
                          component="img"
                          src={paytm}
                          alt="paytm"
                          sx={{ width: 50, height: 50 }}
                        />
                      }
                    />
                    <FormControlLabel
                      value="phonepe"
                      control={<Radio size="small" />}
                      label={
                        <Box
                          component="img"
                          src={phonepe}
                          alt="pnonepe"
                          sx={{ width: 50, height: 50 }}
                        />
                      }
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={upiPayConfirm}
                  sx={{ width: "100%", mt: 2 }}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress size={20} />
                      <span style={{ color: "#FF5A5F" }}>Processing...</span>
                    </Box>
                  ) : (
                    `Pay ₹${totalAmount.toFixed(2)}`
                  )}
                </Button>
              </Box>
            </Box>
          </Modal>
        )}
      </Box>
    </>
  );
};

export default Checkout;
