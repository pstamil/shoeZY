import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Box, Container, Divider, Grid, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../assets/logo.png";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <Container>
      <Grid container sx={{ padding: "30px 0" }}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "start",
              gap: 1,
              p: "10px",
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: "140px",
                height: "100px",
              }}
            />
            <Box sx={{ maxWidth: 200, fontSize: "14px" }}>
              <p>
                Lorem ipsum dolor sit amet consl adipisi elit, sed do eiusmod
                templ.
              </p>
            </Box>
            <Box
              sx={{
                padding: "10px 0",
                width: "100%",
                mt: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2.5,
                }}
              >
                <Link
                  href="https://www.facebook.com/"
                  underline="none"
                  target="_blank"
                >
                  <Facebook sx={{ color: "black" }} />
                </Link>
                <Link
                  href="https://www.instagram.com/"
                  underline="none"
                  target="_blank"
                >
                  <Instagram sx={{ color: "black" }} />
                </Link>
                <Link
                  href="https://twitter.com/"
                  underline="none"
                  target="_blank"
                >
                  <Twitter sx={{ color: "black" }} />
                </Link>
                <Link
                  href="https://in.linkedin.com/"
                  underline="none"
                  target="_blank"
                >
                  <LinkedIn sx={{ color: "black" }} />
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          sx={{ mt: { xs: 2, sm: 0, md: 0, lg: 0 } }}
        >
          <Box
            sx={{ p: "10px", display: "flex", flexDirection: "column", gap: 2 }}
          >
            <p style={{ marginBottom: "8px", fontWeight: "bold" }}>Contact</p>
            <Box>
              <h5>Address</h5>
              <p style={{ color: "gray", fontSize: "12px", marginTop: "5px" }}>
                No.3, 10th cross St, Anna Nagar, <br />
                Puducherry-605008.
              </p>
            </Box>
            <Box>
              <h5>Feel Free to call</h5>
              <p style={{ color: "gray", fontSize: "12px", marginTop: "5px" }}>
                +(91) 97873 83XXX
              </p>
            </Box>
            <Box>
              <h5>Need Support?</h5>
              <p style={{ color: "gray", fontSize: "12px", marginTop: "5px" }}>
                xxx123@gmail.com
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          sx={{ mt: { xs: 2, sm: 2, md: 0, lg: 0 } }}
        >
          <Box sx={{ padding: "10px" }}>
            <Box>
              <p style={{ marginBottom: "20px", fontWeight: "bold" }}>Help</p>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <li>
                  <Link href="#" underline="none" color="black" fontSize="14px">
                    Payment
                  </Link>
                </li>
                <li>
                  <Link href="#" underline="none" color="black" fontSize="14px">
                    Cancellation & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" underline="none" color="black" fontSize="14px">
                    FAQ
                  </Link>
                </li>
                <li>
                  <RouterLink
                    to="/contact"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "14px",
                    }}
                  >
                    Contact Support
                  </RouterLink>
                </li>
              </ul>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          sx={{ mt: { xs: 2, sm: 2, md: 0, lg: 0 } }}
        >
          <Box sx={{ padding: "10px" }}>
            <p style={{ marginBottom: "20px", fontWeight: "bold" }}>
              Quick Links
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <li>
                <Link href="#" underline="none" color="black" fontSize="14px">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" underline="none" color="black" fontSize="14px">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <RouterLink
                  to="/contact"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "14px",
                  }}
                >
                  Contact Support
                </RouterLink>
              </li>
              <li>
                <Link href="#" underline="none" color="black" fontSize="14px">
                  Cancellation & Returns
                </Link>
              </li>
            </ul>
          </Box>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid container sx={{ padding: "20px 20px 20px 10px" }}>
        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ fontSize: "14px" }}>
          ShoeZY &copy;{`${year} - All rights reserved`}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            justifyContent: { md: "end", lg: "end" },
            mt: { sm: 0, xs: 3, lg: 0, md: 0 },
            fontSize: "14px",
            gap: { md: 1, lg: 1 },
          }}
        >
          <span>Design and developed by</span>
          <Link href="https://github.com/pstamil">@pstamil</Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footer;
