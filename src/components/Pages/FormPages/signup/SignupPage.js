import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import loginImg from "../../../../assets/loginpage.jpg";

function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cPassword: "",
    showPassword: false,
    cPasswordShow: false,
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    cPassword: "",
  });

  const navigate = useNavigate();

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

  const handleCPasswordVisibilityToggle = () => {
    setFormData({
      ...formData,
      cPasswordShow: !formData.cPasswordShow,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;
        console.log("New user:", user);
        navigate("/login");
      } catch (error) {
        console.error("Error creating user:", error.message);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    if (!formData.cPassword) {
      errors.cPassword = "Confirm Password is required";
    } else if (formData.password !== formData.cPassword) {
      errors.cPassword = "Passwords do not match";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
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
                <h1>SignUp</h1>
                <span style={{ fontSize: "12px" }}>
                  Please enter your details to create an account.
                </span>
              </Box>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "20px",
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
                <TextField
                  fullWidth
                  type={formData.cPasswordShow ? "text" : "password"}
                  variant="standard"
                  label="Confirm Password"
                  name="cPassword"
                  size="small"
                  color="secondary"
                  value={formData.cPassword}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleCPasswordVisibilityToggle}
                          edge="end"
                          disableRipple
                          sx={{ mb: 0.3, mr: 0.1 }}
                        >
                          {formData.cPasswordShow ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!formErrors.cPassword}
                  helperText={formErrors.cPassword}
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
                  SignUp
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
                    Already have an account?
                  </span>
                  <Link
                    to="/login"
                    style={{ fontSize: "13px", color: "#FF5A5F" }}
                  >
                    LogIn
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

export default SignupPage;
