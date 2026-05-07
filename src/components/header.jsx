import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import SearchBar from "./pages/SearchPage";
import { Products } from "./Products/productitems";
import { useCart } from "./context/cartContext";
import { useAuth } from "./context/AuthContext.jsx";

export default function Header() {
  const { cartCount } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`border-b shadow-sm transition-all duration-300 fixed top-12 left-0 right-0 z-50 ${isDarkMode
        ? "bg-gray-900 text-white border-gray-800"
        : "bg-white text-gray-800 border-gray-200"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/home">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <h1 className="text-lg font-bold tracking-wide">EasyShop</h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
          <Link to="/home" className="hover:text-blue-500 transition-colors">
            Home
          </Link>
          <Link to="/books" className="hover:text-blue-500 transition-colors">
            Books
          </Link>
          <Link to="/contact" className="hover:text-blue-500 transition-colors">
            Contact
          </Link>
          <Link to="/blog" className="hover:text-blue-500 transition-colors">
            Blog
          </Link>
          <Link to="/offers" className="hover:text-blue-500 transition-colors">
            Offers
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Desktop Search Form */}
          <div className="hidden md:block w-64">
            <SearchBar allProducts={Products} />
          </div>

          {/* Mobile Search Button (opens search page) */}
          <button
            onClick={() => navigate("/search")}
            className="md:hidden p-2 rounded-md hover:bg-blue-50 dark:hover:bg-white transition"
            aria-label="Search"
          >
            🔍
          </button>

          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme}
            className={`p-2 rounded-full transition
              ${isDarkMode
                ? "bg-gray-900 hover:bg-white"
                : "bg-white hover:bg-gray-800"
              }`}
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className={`relative p-2 rounded-full transition 
            ${isDarkMode
                ? "bg-gray-900 hover:bg-white"
                : "bg-white  hover:shadow-lg"
              }`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
              className="h-6 w-6"
              alt="cart"
            />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-1 rounded-full">
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </span>
          </Link>

          {/* Login */}
          {user ? (
            <Link
              to="/profile"
              className={`hidden sm:flex items-center gap-1 hover:text-blue-500 ${isDarkMode ? "text-gray-300" : "text-gray-700"} transition-colors`}
            >
              <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {/* <span className="text-sm">Profile</span> */}
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-block px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div
          className={`md:hidden border-t text-center ${isDarkMode
            ? "border-gray-800 bg-gray-900 text-white"
            : "border-gray-200 bg-white text-gray-800"
            }`}
        >
          <div className="flex flex-col items-start p-4 space-y-3">
            <Link
              to="/home"
              className="w-full hover:text-blue-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/books"
              className="w-full hover:text-blue-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Books
            </Link>
            <Link
              to="/contact"
              className="w-full hover:text-blue-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="w-full hover:text-blue-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/offers"
              className="w-full hover:text-blue-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Offers
            </Link>
            <div className="flex items-center gap-3 mt-3 w-full justify-center">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium text-center transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}