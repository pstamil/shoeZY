import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase/Firebase";
import loginImg from "../../../../assets/loginpage.jpg";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [userError, setUserError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handlePasswordVisibilityToggle = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;
        console.log("Auth user:", user);
        navigate("/");
      } catch (error) {
        setUserError(true);
        console.error("Error logging in:", error.message);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${loginImg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            lg={7}
            xl={7}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 5,
              p: "40px 0 20px 0",
              boxShadow: {
                xs: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                sm: "none",
                md: "none",
                lg: "none",
              },
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                flexDirection: "column",
                gap: 3,
                width: { xs: 250, sm: 400, md: 400, lg: 400, xl: 400 },
              }}
            >
              <Box>
                <h1>Login</h1>
                <span style={{ fontSize: "12px" }}>
                  Welcome Back! Please enter your details.
                </span>
              </Box>
              {userError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  Invalid login credentials
                </span>
              )}
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "30px",
                  width: "100%",
                }}
              >
                <TextField
                  fullWidth
                  type="text"
                  variant="standard"
                  label="Email"
                  name="email"
                  size="small"
                  color="secondary"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
                <TextField
                  fullWidth
                  type={formData.showPassword ? "text" : "password"}
                  variant="standard"
                  label="Password"
                  name="password"
                  size="small"
                  color="secondary"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePasswordVisibilityToggle}
                          edge="end"
                          disableRipple
                          sx={{ mb: 0.3, mr: 0.1 }}
                        >
                          {formData.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  sx={{
                    width: "100%",
                    mt: 2,
                  }}
                >
                  LogIn
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    width: "100%",
                    gap: 1,
                  }}
                >
                  <span style={{ fontSize: "12px" }}>
                    Don't have an account?
                  </span>
                  <Link
                    to="/signup"
                    style={{ fontSize: "13px", color: "#FF5A5F" }}
                  >
                    SignUp here
                  </Link>
                </Box>
              </form>
            </Box>
            <Link to="/" style={{ color: "black" }}>
              <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                <Close sx={{ fontSize: "30px" }} />
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default LoginPage;
