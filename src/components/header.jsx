// src/Header.jsx
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
  const { user, loading } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  if (loading) return null;

  return (
    <header
      className={`border-b shadow-sm transition-all duration-300 fixed top-12 left-0 right-0 z-50
      ${
        isDarkMode
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

            <h1 className="text-lg font-bold tracking-wide">
              EasyShop
            </h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
          <Link
            to="/home"
            className="hover:text-blue-500 transition-colors"
          >
            Home
          </Link>

          <Link
            to="/books"
            className="hover:text-blue-500 transition-colors"
          >
            Books
          </Link>

          <Link
            to="/contact"
            className="hover:text-blue-500 transition-colors"
          >
            Contact
          </Link>

          <Link
            to="/blog"
            className="hover:text-blue-500 transition-colors"
          >
            Blog
          </Link>

          <Link
            to="/offers"
            className="hover:text-blue-500 transition-colors"
          >
            Offers
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Desktop Search */}
          <div className="hidden md:block w-64">
            <SearchBar allProducts={Products} />
          </div>

          {/* Mobile Search */}
          <button
            onClick={() => navigate("/search")}
            className={`md:hidden p-2 rounded-md transition
            ${
              isDarkMode
                ? "hover:bg-gray-700"
                : "hover:bg-gray-100"
            }`}
            aria-label="Search"
          >
            🔍
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition
            ${
              isDarkMode
                ? "hover:bg-gray-700"
                : "hover:bg-gray-100"
            }`}
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className={`relative p-2 rounded-full transition
            ${
              isDarkMode
                ? "hover:bg-gray-700"
                : "hover:bg-gray-100"
            }`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
              className="h-6 w-6"
              alt="cart"
            />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile / Login */}
          {user ? (
            <Link
              to="/profile"
              className={`hidden sm:flex items-center gap-2 transition-colors hover:text-blue-500
              ${
                isDarkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>

              {/* <span className="text-sm font-medium">
                Profile
              </span> */}
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-md transition
            ${
              isDarkMode
                ? "hover:bg-gray-700"
                : "hover:bg-gray-100"
            }`}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden border-t transition-all duration-300 text-center
          ${
            isDarkMode
              ? "border-gray-800 bg-gray-900 text-white"
              : "border-gray-200 bg-white text-gray-800"
          }`}
        >
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/home"
              className="hover:text-blue-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/books"
              className="hover:text-blue-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Books
            </Link>

            <Link
              to="/contact"
              className="hover:text-blue-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            <Link
              to="/blog"
              className="hover:text-blue-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>

            <Link
              to="/offers"
              className="hover:text-blue-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Offers
            </Link>

            {/* Mobile Profile/Login */}
            <div className="pt-2">
              {user ? (
                <Link
                  to="/profile"
                  className="block w-full text-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}