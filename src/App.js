import React from "react";
import AddProduct from "./components/dashboard/pages/addProduct/AddProduct";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductDetails from "./components/ProductList/ProductDetails";
import Cart from "./components/cart/Cart";
import Home from "./components/Pages/Home/Home";
import NotFoundPage from "./components/Pages/404page/NotFoundPage";
import MainLayout from "./components/layout/MainLayout";
import About from "./components/Pages/About/About";
import Contact from "./components/Pages/Contact/Contact";
import { useEffect } from "react";
import LoginPage from "./components/Pages/FormPages/login/LoginPage";
import SignupPage from "./components/Pages/FormPages/signup/SignupPage";
import Checkout from "./components/cart/Checkout";
import Shop from "./components/Pages/shop/Shop";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import AllProducts from "./components/dashboard/pages/allProducts/AllProducts";
import EditProduct from "./components/dashboard/pages/editProduct/EditProduct";
import PreLoader from "./components/preLoader/PreLoader";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <>
      {isLoading ? (
        <PreLoader />
      ) : (
        <>
          <ScrollToTop />
          <Routes>
            <Route path="" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="shop/:id" element={<ProductDetails />} />
              <Route path="shop/cart" element={<Cart />} />
              <Route path="shop/cart/checkout" element={<Checkout />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />

            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="allproduct" element={<AllProducts />} />
              <Route path="allproduct/edit/:id" element={<EditProduct />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
