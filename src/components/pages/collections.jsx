import React from "react";
import { useTheme } from "../ThemeProvider";
import { Link } from "react-router-dom";
import { AllCollections } from "../Products/AllCollection";

const Collections = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`pt-40 py-16 px-6 text-center transition-colors duration-300
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold mb-12">
        All Categories
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {AllCollections.map((cat, i) => (
          <Link to={cat.link} key={i}>
            <div
              className={`rounded-xl p-6 cursor-pointer transition-all duration-300
            flex flex-col items-center justify-center
            ${isDarkMode
                  ? "bg-gray-800 border border-gray-700 hover:bg-indigo-500 hover:text-white shadow-md hover:shadow-indigo-500/20"
                  : "bg-white border border-gray-200 hover:bg-indigo-600 hover:text-white shadow-sm hover:shadow-lg"
                }`}
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="text-sm font-semibold">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
};

export default Collections;