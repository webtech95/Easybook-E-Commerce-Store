import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { X, ShoppingBag, Users } from "lucide-react";


// Layout components
import Header from "./components/header";
import Footer from "./components/footer";
import TopBanner from "./components/pages/TopBanner";
import ScrollToTopOnRoute from "./Scroller/ScrollToTopOnRoute";

// Page components
import HomePage from "./components/pages/Home";
import CartPage from "./components/Cart/cart";
import Contact from "./components/pages/Contact";
import Offers from "./components/pages/Offers";
import Collections from "./components/pages/collections";
import Checkout from "./components/pages/Checkout";
import BlogPage from "./components/pages/BlogPage";
import ProductDetails from "./components/Products/ProductDetails";
import CategoriesPage from "./components/pages/CategoriesPage";
import LoginRegisterPage from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Register from "./components/login&ragister/ragisterpage";
import OtpVerification from "./components/login&ragister/OtpVerification";
import Welcome from "./components/pages/Welcome";
import Books from "./components/Products/Books";
import welcome from "./components/pages/Welcome";

const AppRoutes = () => {
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Show popup only once per session (sessionStorage)
    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisitedBefore");

        // Show popup only first time user visits website
        if (!hasVisited) {
            const timer = setTimeout(() => {
                setShowWelcomePopup(true);

                // Mark user as visited
                sessionStorage.setItem("hasVisitedBefore", "true");
            }, 300);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClosePopup = () => {
        setShowWelcomePopup(false);
        sessionStorage.setItem("hasVisitedBefore", "true");
    };

    const handleGetStarted = () => {
        handleClosePopup();
        navigate("/login");
    };

    return (
        <>
            {/* Your existing layout */}
            <ScrollToTopOnRoute />
            <TopBanner />
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginRegisterPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/books" element={<Books />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/collection" element={<Collections />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/categories/:category" element={<CategoriesPage />} />
                <Route path="/category/:categorySlug" element={<CategoriesPage />} />
                <Route path="/verify-otp" element={<OtpVerification />} />
                <Route path="/welcome" element={<Welcome />} />
            </Routes>

            <Footer />

            {/* Welcome Popup – same design as yours */}
            {showWelcomePopup && (
                <Welcome onClose={() => setShowWelcomePopup(false)} />
            )}
        </>
    );
};

// Main Router component
const Router = () => (
    <HashRouter>
        <AppRoutes />
    </HashRouter>
);

export default Router;