// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`border-t shadow-sm transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-gray-200 border-gray-800"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">EasyShop Books</h3>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>
              Your premier destination for premium books, rare collections, and exclusive literary content.
            </p>

            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                "Categories",
                "New Releases",
                "Bestsellers",
                "Special Offers",
                "Premium Membership",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link}`}
                    className={`hover:text-blue-500 transition ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {link.replace("-", " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {["Contact", "Shipping", "Returns", "FAQ", "Privacy Policy"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to={`/${link}`}
                      className={`hover:text-blue-500 transition ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {link.replace("-", " ")}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Join Our Newsletter</h4>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>
              Subscribe to receive updates on new releases and exclusive offers.
            </p>

            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <span>🚚</span>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>📚</span>
              <span>Exclusive Books</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>🏆</span>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`py-4 border-t ${
          isDarkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>
            © {new Date().getFullYear()} EasyShop Books. All rights reserved.
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8" />
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-8" />
            <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-8" />
            <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}