import React, { useState } from "react";
import { db, storage } from "../../../../firebase/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import {
  Container,
  TextField,
  Button,
  Grid,
  InputLabel,
  Rating,
  Select,
  MenuItem,
  FormControl,
  Box,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    previousPrice: "",
    offerPrice: "",
    category: "",
    brand: "",
    colors: [],
    description: "",
    rating: 0,
    deliveryCharge: 0,
    idealFor: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setProduct({
      ...product,
      rating: newValue,
    });
  };

  const [images, setImages] = useState([]);

  const types = ["image/png", "image/jpeg"]; // image types

  const productImgHandler = (e) => {
    let selectedFiles = e.target.files;
    let selectedImages = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      if (types.includes(selectedFiles[i].type)) {
        selectedImages.push(selectedFiles[i]);
      }
    }

    setImages(selectedImages);
  };

  // Function to remove a selected image
  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  const renderImagePreviews = () => {
    return (
      <Box>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{ display: "flex", gap: 2, alignItems: "center" }}
          >
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <Button
              variant="outlined"
              onClick={() => removeImage(index)}
              sx={{ width: 80, height: 30 }}
            >
              Remove
            </Button>
          </Box>
        ))}
      </Box>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!images || images.length === 0) {
      console.error("Please select one or more valid images.");
      return;
    }

    const uploadPromises = images.map((image) => {
      const imageRef = ref(storage, `productImg/${image.name}`);
      return uploadBytes(imageRef, image);
    });

    Promise.all(uploadPromises)
      .then((snapshot) => {
        const imageUrls = snapshot.map((snap) => getDownloadURL(snap.ref));
        return Promise.all(imageUrls);
      })
      .then((urls) => {
        const productData = {
          name: product.name,
          previousPrice: product.previousPrice,
          offerPrice: product.offerPrice,
          category: product.category,
          brand: product.brand,
          colors: product.colors,
          description: product.description,
          rating: product.rating,
          images: urls,
          deliveryCharge: product.deliveryCharge,
          idealFor: product.idealFor,
        };

        return addDoc(collection(db, "products"), productData);
      })
      .then(() => {
        console.log("Product added to Firestore.");
        setProduct({
          name: "",
          previousPrice: "",
          offerPrice: "",
          category: "",
          brand: "",
          colors: [],
          description: "",
          rating: 0,
          deliveryCharge: 0,
          idealFor: "",
        });
        setImages([]);
        navigate("/dashboard/allproduct");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <Box mt={15} mb={10}>
      <Container>
        <Box
          sx={{
            mb: 5,
            mt: 10,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <hr
            style={{
              background: "#7A73EA",
              width: "40px",
              height: "3px",
              border: "none",
            }}
          />
          <h1 style={{ fontWeight: "500" }}>Product Upload</h1>
        </Box>
        <Grid container>
          <Grid
            item
            xs={0}
            sm={0}
            md={0.05}
            lg={0.05}
            sx={{ bgcolor: "#7A73EA" }}
          ></Grid>
          <Grid item xs={0} sm={0} md={0.45} lg={0.45}></Grid>
          <Grid item xs={12} sm={12} md={11.5} lg={11.5}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Product Name"
                    value={product.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    fullWidth
                    name="previousPrice"
                    label="Previous Price"
                    value={product.previousPrice}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    fullWidth
                    name="offerPrice"
                    label="Offer Price"
                    value={product.offerPrice}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      name="category"
                      value={product.category}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Formal">Formal</MenuItem>
                      <MenuItem value="Casual">Casual</MenuItem>
                      <MenuItem value="Sneakers">Sneakers</MenuItem>
                      <MenuItem value="Sports">Sports</MenuItem>
                      <MenuItem value="Loafer">Loafer</MenuItem>
                      <MenuItem value="Boot">Boot</MenuItem>
                      <MenuItem value="Hiking boot">Hiking boot</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel>Colors</InputLabel>
                    <Select
                      id="colors"
                      name="colors"
                      label="Colors"
                      multiple
                      value={product.colors}
                      onChange={handleInputChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {[
                        "Red",
                        "Green",
                        "Black",
                        "Blue",
                        "Yellow",
                        "Orange",
                        "White",
                      ].map((color) => (
                        <MenuItem key={color} value={color}>
                          <Checkbox checked={product.colors.includes(color)} />
                          <ListItemText primary={color} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select
                      fullWidth
                      name="brand"
                      label="Brand"
                      value={product.brand}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Adidas">Adidas</MenuItem>
                      <MenuItem value="Nike">Nike</MenuItem>
                      <MenuItem value="Puma">Puma</MenuItem>
                      <MenuItem value="Reebok">Reebok</MenuItem>
                      <MenuItem value="Bata">Bata</MenuItem>
                      <MenuItem value="Walkaroo">Walkaroo</MenuItem>
                      <MenuItem value="Woodland">Woodland</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel>Ideal For</InputLabel>
                    <Select
                      fullWidth
                      name="idealFor"
                      label="Ideal For"
                      value={product.idealFor}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Men">Men</MenuItem>
                      <MenuItem value="Women">Women</MenuItem>
                      <MenuItem value="Both">Both</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    fullWidth
                    name="deliveryCharge"
                    label="Delivery Charge"
                    type="number"
                    value={product.deliveryCharge}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={product.description}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <InputLabel sx={{ mb: 2 }}>Images</InputLabel>
                  <TextField
                    fullWidth
                    type="file"
                    multiple
                    onChange={productImgHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {images.length > 0 && (
                    <div>
                      <h3>Selected Images:</h3>
                      {renderImagePreviews()}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} mt={2}>
                  <InputLabel sx={{ mb: 1 }}>Rating</InputLabel>
                  <Rating
                    name="rating"
                    value={product.rating}
                    precision={0.5}
                    onChange={handleRatingChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  sx={{ mt: { xs: 0, sm: 2, md: 2, lg: 2 } }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%", mt: 2 }}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  sx={{ mt: { xs: 0, sm: 2, md: 2, lg: 2 } }}
                >
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    sx={{ width: "100%", mt: 2 }}
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddProduct;
