import React, { useState } from "react";
import { Grid, TextField, Button, Box, CircularProgress } from "@mui/material";
import CreditCardUI from "./CerditCardUI";

const CreditCard = ({ PaymentConfirm, totalAmount, isProcessing }) => {
  const [formData, setFormData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const [formErrors, setFormErrors] = useState({
    number: false,
    name: false,
    expiry: false,
    cvc: false,
  });

  const handleCardNumberChange = (e) => {
    const sanitizedValue = e.target.value.replace(/\D/g, "");
    const limitedValue = sanitizedValue.slice(0, 16);

    setFormData({
      ...formData,
      number: limitedValue,
    });
  };

  const handleCvcChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
    const limitedValue = sanitizedValue.slice(0, 3);

    setFormData({
      ...formData,
      cvc: limitedValue,
    });
  };

  const handleExpiryChange = (e) => {
    const sanitizedValue = e.target.value.replace(/\D/g, "");
    const limitedValue = sanitizedValue.slice(0, 4);
    const formattedValue = limitedValue.replace(/(\d{2})(\d{2})/, "$1/$2");

    const errors = {};
    let formIsValid = true;
    const currentYear = new Date().getFullYear().toString().slice(2);
    const currentMonth = (new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const currentYearMonth = currentYear + currentMonth;
    const enteredYearMonth =
      sanitizedValue.slice(2) + sanitizedValue.slice(0, 2);

    if (enteredYearMonth < currentYearMonth) {
      errors.expiry = true;
      formIsValid = false;
    } else {
      errors.expiry = false;
    }

    setFormData({
      ...formData,
      expiry: formattedValue,
    });

    setFormErrors(errors);
  };

  const handleNameChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");

    setFormData({
      ...formData,
      name: sanitizedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    let formIsValid = true;

    if (!formData.number) {
      errors.number = true;
      formIsValid = false;
    }

    if (!formData.name) {
      errors.name = true;
      formIsValid = false;
    }

    if (!formData.expiry) {
      errors.expiry = true;
      formIsValid = false;
    }

    if (!formData.cvc) {
      errors.cvc = true;
      formIsValid = false;
    }

    setFormErrors(errors);

    if (formIsValid) {
      const cardDta = { ...formData };
      PaymentConfirm(cardDta);
      console.log(cardDta);
    }
  };

  return (
    <Box sx={{ position: "relative", maxWidth: 300 }}>
      <Box sx={{ position: "absolute", top: -50 }}>
        <CreditCardUI
          number={formData.number}
          name={formData.name}
          expiry={formData.expiry}
          cvc={formData.cvc}
        />
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ pt: 15 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
            <TextField
              variant="standard"
              size="small"
              label="Card Number"
              name="number"
              value={formData.number}
              onChange={handleCardNumberChange}
              fullWidth
              error={formErrors.number}
              helperText={formErrors.number ? "Card number is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              variant="standard"
              size="small"
              label="Cardholder Name"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              fullWidth
              error={formErrors.name}
              helperText={formErrors.name ? "Name is required" : ""}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              variant="standard"
              size="small"
              label="MM/YY"
              name="expiry"
              value={formData.expiry}
              onChange={handleExpiryChange}
              fullWidth
              error={formErrors.expiry}
              helperText={formErrors.expiry ? "Invalid expiry date" : ""}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              variant="standard"
              size="small"
              label="CVC"
              name="cvc"
              value={formData.cvc}
              onChange={handleCvcChange}
              fullWidth
              error={formErrors.cvc}
              helperText={formErrors.cvc ? "Invalid CVC" : ""}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
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
  );
};

export default CreditCard;
