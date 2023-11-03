import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MobileNav from "./MobileNav";
import {
  AccountCircleOutlined,
  AddCard,
  DashboardCustomize,
  LoginOutlined,
  MenuOutlined,
  Person,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  Badge,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { selectCartItems } from "../../redux/Slices/cartSlice";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartProducts = useSelector(selectCartItems);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 90) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    });
  }, []);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const [menuOpen, setMenuOpen] = useState(null);
  const handleClose = () => {
    setMenuOpen(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          background: scrolling ? "white" : "transparent",
          boxShadow: scrolling
            ? "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px"
            : "none",
          color: "black",

          display: "flex",
          justifyContent: "center",
          transition: "background 0.5s ease, box-shadow 0.5s ease",
          mt: scrolling ? 0 : 4,
        }}
      >
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: "80px",
              background: scrolling ? "transparent" : "white",
              boxShadow: scrolling
                ? "none"
                : "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
              transition: " box-shadow 0.5s ease",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "120px",
                  height: "80px",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: { xs: 0, sm: 2, md: 4, lg: 4 } }}>
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "flex",
                    lg: "flex",
                  },
                  alignItems: "center",
                  gap: { xs: 0, sm: 0, md: 5, lg: 6 },
                }}
              >
                <NavLink to="/" className="navLink">
                  Home
                </NavLink>
                <NavLink to="shop" className="navLink">
                  Shop
                </NavLink>

                <NavLink to="about" className="navLink">
                  About
                </NavLink>
                <NavLink to="contact" className="navLink">
                  Contact
                </NavLink>
              </Box>
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "flex",
                    md: "flex",
                    lg: "flex",
                  },
                  gap: { xs: 0, sm: 1, md: 2, lg: 2 },
                }}
              >
                <Link
                  to="shop/cart"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <IconButton
                    size="large"
                    aria-label="Cart"
                    color="inherit"
                    disableRipple
                  >
                    <Badge badgeContent={cartProducts.length} color="secondary">
                      <ShoppingCartOutlined />
                    </Badge>
                  </IconButton>
                </Link>
                {user ? (
                  <>
                    <IconButton
                      size="large"
                      color="inherit"
                      aria-label="Profile and Logout"
                      onClick={(e) => setMenuOpen(e.currentTarget)}
                      sx={{ ml: 1 }}
                      disableRipple
                    >
                      <Person />
                    </IconButton>

                    <Menu
                      anchorEl={menuOpen}
                      open={Boolean(menuOpen)}
                      onClose={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 2,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem
                        onClick={() => {
                          navigate("dashboard");
                          handleClose();
                        }}
                      >
                        <ListItemIcon>
                          <DashboardCustomize fontSize="small" />
                        </ListItemIcon>
                        Dashboard
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate("/dashboard/addproduct");
                          handleClose();
                        }}
                      >
                        <ListItemIcon>
                          <AddCard fontSize="small" />
                        </ListItemIcon>
                        Add Product
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <LoginOutlined fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Tooltip title="Go To Login">
                    <Link
                      to="login"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <IconButton
                        size="large"
                        aria-label="Account"
                        color="inherit"
                      >
                        <AccountCircleOutlined />
                      </IconButton>
                    </Link>
                  </Tooltip>
                )}
              </Box>
              <Box
                sx={{
                  display: {
                    xs: "flex",
                    sm: "flex",
                    md: "none",
                    lg: "none",
                  },
                }}
              >
                <IconButton
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                    mr: 2,
                    display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
                  }}
                >
                  <MenuOutlined style={{ color: "black" }} />
                </IconButton>
              </Box>
            </Box>
            <CssBaseline />
          </Toolbar>
        </Container>
      </AppBar>
      <MobileNav
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Box>
  );
}

export default NavBar;
