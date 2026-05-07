import React, { Profiler } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./components/pages/Home";
import CartPage from "./components/pages/CartPage";
import TopBanner from "./components/pages/TopBanner";
import Contact from "./components/pages/Contact";
import Offers from "./components/pages/Offers";
import Collections from "./components/pages/collections";
import ScrollToTopOnRoute from "./Scroller/ScrollToTopOnRoute";
import Books from "./components/Products/Books";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./components/pages/Checkout";
import BlogPage from "./components/pages/BlogPage";
import ProductDetails from "./components/Products/ProductDetails";
import CategoriesPage from "./components/pages/CategoriesPage";
import LoginRegisterPage from "./components/pages/LoginRegisterPage";
// import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import { AuthProvider } from "./components/context/AuthContext.jsx";


function App() {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        theme="colored"
      />
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTopOnRoute />
            <TopBanner />
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginRegisterPage />} />
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/books" element={<Books />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/collection" element={<Collections />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/categories/:category" element={<CategoriesPage />} />
              <Route path="/category/:categorySlug" element={<CategoriesPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
