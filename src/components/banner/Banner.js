import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import {
  CreditScoreOutlined,
  LocalShippingOutlined,
  PublishedWithChangesOutlined,
  SupportAgentOutlined,
} from "@mui/icons-material";

function Banner() {
  return (
    <Grid container mt={5} mb={5} sx={{ padding: "20px 0" }}>
      <Grid item xs={6} sm={6} md={3} lg={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <LocalShippingOutlined
            sx={{ width: "40px", height: "40px" }}
            data-aos="zoom-in"
            data-aos-offset="50"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" },
              }}
            >
              Free Delivery
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "block", lg: "block" },
              }}
            >
              <span style={{ fontSize: "12px", color: "gray" }}>
                Free Shipping on all order
              </span>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" } }}
      />
      <Grid item xs={6} sm={6} md={3} lg={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <PublishedWithChangesOutlined
            sx={{ width: "40px", height: "40px" }}
            data-aos="zoom-in"
            data-aos-offset="50"
            data-aos-delay="50"
            data-aos-duration="1300"
            data-aos-easing="ease-in-out"
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" },
              }}
            >
              Return Policy
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "block", lg: "block" },
              }}
            >
              <span style={{ fontSize: "12px", color: "gray" }}>
                Free Shipping on all order
              </span>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" } }}
      />
      <Grid item xs={6} sm={6} md={3} lg={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: { xs: 3, sm: 3, md: 0, lg: 0 },
          }}
        >
          <SupportAgentOutlined
            sx={{ width: "40px", height: "40px" }}
            data-aos="zoom-in"
            data-aos-offset="50"
            data-aos-delay="50"
            data-aos-duration="1600"
            data-aos-easing="ease-in-out"
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" },
              }}
            >
              24/7 Support
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "block", lg: "block" },
              }}
            >
              <span style={{ fontSize: "12px", color: "gray" }}>
                Free Shipping on all order
              </span>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" } }}
      />
      <Grid item xs={6} sm={6} md={2.9} lg={2.9}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: { xs: 3, sm: 3, md: 0, lg: 0 },
          }}
        >
          <CreditScoreOutlined
            sx={{ width: "40px", height: "40px" }}
            data-aos="zoom-in"
            data-aos-offset="50"
            data-aos-delay="50"
            data-aos-duration="1900"
            data-aos-easing="ease-in-out"
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" },
              }}
            >
              Secure Payment
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "block", lg: "block" },
              }}
            >
              <span style={{ fontSize: "12px", color: "gray" }}>
                Free Shipping on all order
              </span>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Banner;
