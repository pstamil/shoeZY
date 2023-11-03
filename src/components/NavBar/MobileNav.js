import PropTypes from "prop-types";
import React from "react";
import Box from "@mui/material/Box";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import { Link, NavLink } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  IconButton,
  Badge,
} from "@mui/material";
import {
  AddCard,
  DashboardCustomize,
  LoginOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { selectCartItems } from "../../redux/Slices/cartSlice";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { useEffect } from "react";
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";

const drawerWidth = 240;

function MobileNav(props) {
  const { window, handleDrawerToggle, mobileOpen } = props;

  const cartProducts = useSelector(selectCartItems);

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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box>
        <img
          src={logo}
          alt="logo"
          style={{
            width: "160px",
            height: "110px",
          }}
        />
      </Box>
      <Divider />
      <List
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 1,
          mt: 2,
        }}
      >
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          <ListItemButton
            sx={{ display: "flex", justifyContent: "start", ml: 5 }}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
        </NavLink>
        <NavLink to="shop" style={{ textDecoration: "none", color: "black" }}>
          <ListItemButton
            sx={{ display: "flex", justifyContent: "start", ml: 5 }}
          >
            <ListItemText primary="Shop" />
          </ListItemButton>
        </NavLink>
        <NavLink to="about" style={{ textDecoration: "none", color: "black" }}>
          <ListItemButton
            sx={{ display: "flex", justifyContent: "start", ml: 5 }}
          >
            <ListItemText primary="About" />
          </ListItemButton>
        </NavLink>
        <NavLink
          to="contact"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItemButton
            sx={{ display: "flex", justifyContent: "start", ml: 5 }}
          >
            <ListItemText primary="Contact" />
          </ListItemButton>
        </NavLink>

        <Divider sx={{ mb: 1 }} />
        <Link to="shop/cart" style={{ color: "black", textDecoration: "none" }}>
          <ListItemButton
            sx={{ display: "flex", justifyContent: "start", ml: 2 }}
          >
            <IconButton size="small" aria-label="Cart" color="inherit">
              <Badge badgeContent={cartProducts.length} color="secondary">
                <ShoppingCartOutlined fontSize="small" />
              </Badge>
              &nbsp;&nbsp;&nbsp;Cart
            </IconButton>
          </ListItemButton>
        </Link>
        {user ? (
          <>
            <Link
              to="dashboard"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton
                sx={{ display: "flex", justifyContent: "start", ml: 2 }}
              >
                <IconButton size="small" aria-label="Account" color="inherit">
                  <DashboardCustomize fontSize="small" />
                  &nbsp;&nbsp;Dashboard
                </IconButton>
              </ListItemButton>
            </Link>
            <Link
              to="addproduct"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton
                sx={{ display: "flex", justifyContent: "start", ml: 2 }}
              >
                <IconButton size="small" aria-label="Account" color="inherit">
                  <AddCard fontSize="small" />
                  &nbsp;&nbsp;Add Product
                </IconButton>
              </ListItemButton>
            </Link>
            <ListItemButton
              sx={{ display: "flex", justifyContent: "start", ml: 2 }}
              onClick={handleLogout}
            >
              <IconButton size="small" aria-label="Account" color="inherit">
                <LoginOutlined fontSize="small" />
                &nbsp;&nbsp;Logout
              </IconButton>
            </ListItemButton>
          </>
        ) : (
          <Link to="login" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton
              sx={{ display: "flex", justifyContent: "start", ml: 2 }}
            >
              <IconButton size="small" aria-label="Account" color="inherit">
                <AccountCircleOutlined fontSize="small" />
                &nbsp;&nbsp;Login
              </IconButton>
            </ListItemButton>
          </Link>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "block", md: "none", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
}

MobileNav.propTypes = {
  window: PropTypes.func,
};

export default MobileNav;
