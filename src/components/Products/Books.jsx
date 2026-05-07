import React from "react";
import ProductCard from "./productCard";
import { Products } from "./productitems";
import ScrollToTop from "../../Scroller/ScrollToTop";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeProvider";
import { Link } from "react-router-dom";



const Books = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const showAll = queryParams.get("view") === "all";

  const displayedProducts = showAll ? Products : Products.slice(0, 15);
  const hasProducts = displayedProducts && displayedProducts.length > 0;

  const handleBrowseAll = () => {
    if (!showAll) {
      navigate("/books?view=all");
    }
  };

  const handleShopNow = () => {
    navigate("/books?view=all");
  };

  return (
    <div
      className={`min-h-screen pt-20 transition-colors duration-300
      ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
    >
      {/* ===== Hero Section ===== */}
      <section
        className={`relative py-20 text-center overflow-hidden
        ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        {/* Background Layer */}
        <div
          className={`absolute inset-0
          ${isDarkMode ? "bg-gray-900/40" : "bg-amber-100/100"}`}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1
            className={`text-5xl md:text-6xl font-extrabold mb-4
            ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            EasyBook Collection
          </h1>

          <p
            className={`text-lg md:text-xl
            ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Discover the joy of reading — explore timeless classics, modern
            bestsellers, and exclusive EasyBook editions curated just for you.
          </p>
        </div>
      </section>

      {/* ===== Product Section ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <h2
            className={`text-3xl font-bold
            ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            {showAll ? "All Books" : "Featured Books 📖"}
          </h2>

          <button
            onClick={handleBrowseAll}
            disabled={showAll}
            className={`text-sm border px-5 py-2 rounded-full font-semibold transition
            ${showAll
                ? "border-gray-400 text-gray-400 cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                : "border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
              }`}
          >
            {showAll ? "Showing All Books" : "Browse All Books"}
          </button>
        </div>

        {/* ===== Product Grid ===== */}
        {!hasProducts ? (
          <div className="text-center py-12">
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              No books available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {displayedProducts.map((product) => (
              product ? (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <ProductCard
                    product={product}
                    isDarkMode={isDarkMode}
                  />
                </Link>
              ) : null
            ))}
          </div>
        )}

        {/* Back Button */}
        {showAll && Products.length > 15 && (
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/books")}
              className={`text-sm border px-5 py-2 rounded-full font-semibold transition
              ${isDarkMode
                  ? "border-gray-600 hover:bg-gray-800"
                  : "border-gray-400 hover:bg-gray-100"
                }`}
            >
              ← Back to Featured Books
            </button>
          </div>
        )}
      </section>

      {/* ===== Offer Section ===== */}
      <section
        className={`text-center py-16 px-6 mt-16 text-white shadow-lg
        ${isDarkMode
            ? "bg-gray-800"
            : "bg-gradient-to-r from-amber-350 to-orange-400"}`}
      >
        <h2 className="text-3xl font-bold mb-3">
          Special Reading Offers ✨
        </h2>

        <p className="text-lg mb-6 max-w-3xl mx-auto text-white/90">
          Enjoy <strong>10% off on all online payments</strong> and{" "}
          <strong>extra cashback on bulk book orders</strong>.
        </p>

        <button
          onClick={handleShopNow}
          className="bg-white text-amber-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Shop & Save Now
        </button>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default Books;