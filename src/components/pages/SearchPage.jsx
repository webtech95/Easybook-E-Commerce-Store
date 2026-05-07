import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Products } from "../Products/productitems";
import { useTheme } from "../ThemeProvider";

export default function SearchPage() {
  const { isDarkMode } = useTheme();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 🔍 Filter logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearchOpen(false);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const filtered = Products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );

    setResults(filtered);
    setIsSearchOpen(true);
  }, [query]);

  // 🔤 Handle input
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  // 🚀 Navigate to product
  const handleResultClick = (productId) => {
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <div className="relative w-full">

      {/* 🔍 Search Input */}
      <div
        className={`flex items-center rounded-full px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-500 border ${isDarkMode
          ? "bg-gray-800 text-white border-gray-600"
          : "bg-white text-gray-800 border-gray-300 "
          }`}
      >
        <input
          type="text"
          placeholder="Search by name or category..."
          value={query}
          onChange={handleSearch}
          className={`bg-transparent outline-none w-full text-sm ${isDarkMode
            ? "text-white placeholder-white"
            : "text-gray-800 placeholder-black"
            }`}
        />

        {/* Clear button */}
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-gray-400 hover:text-red-500 mr-2"
          >
            ✖
          </button>
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
          />
        </svg>
      </div>

      {/* 📦 Results Dropdown */}
      {isSearchOpen && (
        <div
          className={`absolute z-50 mt-2 w-full rounded-lg shadow-lg border max-h-80 overflow-y-auto ${isDarkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
            }`}
        >
          {/* Result count */}
          <div
            className={`p-2 border-b text-sm ${isDarkMode
              ? "text-gray-400 border-gray-800"
              : "text-gray-600 border-gray-200"
              }`}
          >
            {results.length} results for "{query}"
          </div>

          {/* Results */}
          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleResultClick(product.id)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition ${isDarkMode
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-100"
                  }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />

                <div>
                  <p
                    className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {product.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div
              className={`p-4 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}