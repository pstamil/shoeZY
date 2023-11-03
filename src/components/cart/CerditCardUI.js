import React from "react";
import { styled } from "@mui/system";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import chip from "../../assets/creditcard/chip.png";
import visa from "../../assets/creditcard/visa.png";
import mastercard from "../../assets/creditcard/mastercard.png";
import american from "../../assets/creditcard/american.png";

const Chip = styled("div")({
  width: 40,
  height: 25,
  backgroundImage: `url(${chip})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
});

const CreditCardUI = ({ number, name, expiry, cvc }) => {
  function formatCardNumber(cardNumber) {
    const cleanNumber = cardNumber.replace(/\D/g, "");
    const formattedNumber = cleanNumber.replace(/(\d{4}(?=\d{4}))/g, "$1 ");
    return formattedNumber;
  }

  const cardNumber = number ? formatCardNumber(number) : "xxxx xxxx xxxx xxxx";
  const cardHolderName = name || "YOUR NAME";
  const cardExpiry = expiry || "xx/xx";
  const cardCVC = cvc || "***";

  const CardLogo = styled("div")(({ theme }) => ({
    width: 40,
    height: 25,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${
      parseInt(number[0]) === 4
        ? visa
        : parseInt(number[0]) === 5
        ? mastercard
        : american
    })`,
  }));
  return (
    <Card
      sx={{
        width: { xs: 238, sm: 300, md: 300, lg: 300 },
        height: { xs: 160, sm: 170, md: 170, lg: 170 },
        background: `${
          parseInt(number[0]) === 4
            ? "linear-gradient(135deg, #5b247a 0%,#1bcedf 100%)"
            : parseInt(number[0]) === 5
            ? "linear-gradient(135deg, #f3a86a 0%,#f9f4f0 100%)"
            : "linear-gradient(135deg, #E3E3E3 0%,#5D6874 100%)"
        }`,
        color: "white",
        boxShadow: "none",
        borderRadius: 2.5,
      }}
    >
      <CardContent>
        <Grid container sx={{ p: 1 }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Chip />
              <CardLogo />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} mt={1}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "18px", sm: "20px", md: "20px", lg: "20px" },
              }}
            >
              {cardNumber}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} mt={1}>
            <Typography variant="h2" sx={{ fontSize: "16px" }}>
              {cardHolderName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h2" sx={{ fontSize: "12px" }}>
                VAL: {cardExpiry}
              </Typography>
              <Typography variant="h2" sx={{ fontSize: "12px" }}>
                CVC: {cardCVC}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CreditCardUI;
