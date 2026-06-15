import React from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import ProductCard from "../Products/productCard";
import { Products } from "../Products/productitems";
import { useTheme } from "../ThemeProvider";
import { AllCollections } from "../Products/AllCollection";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { categorySlug, category } = useParams();

  const currentCategory = categorySlug || category;

  // Find matching collection
  const matchedCollection = AllCollections?.find(
    (item) =>
      item.filterKey === currentCategory ||
      item.slug === currentCategory
  );

  let filteredProducts = [];

  if (matchedCollection) {
    if (matchedCollection.productIds) {
      filteredProducts = Products.filter((p) =>
        matchedCollection.productIds.includes(p.id)
      );
    } else if (matchedCollection.filterKey) {
      filteredProducts = Products.filter(
        (p) => p.category === matchedCollection.filterKey
      );
    } else {
      filteredProducts = Products.filter(
        (p) => p.collectionSlug === currentCategory
      );
    }
  } else {
    filteredProducts = Products.filter(
      (p) =>
        String(p.category).toLowerCase() ===
        String(currentCategory).toLowerCase()
    );
  }

  // Page title
  let pageTitle = "Products";

  if (matchedCollection) {
    pageTitle = matchedCollection.title;
  } else if (filteredProducts.length > 0) {
    pageTitle = `${
      currentCategory.charAt(0).toUpperCase() +
      currentCategory.slice(1)
    } Books`;
  } else {
    pageTitle = "No Products Found";
  }

  const backButton = matchedCollection
    ? { text: "← Back to All Collections", link: "/collection" }
    : { text: "← Back to All Books", link: "/books?view=all" };

  return (
    <section
      className={`min-h-screen py-10 pt-35 px-4 transition-colors duration-300
      ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-50 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          {pageTitle}
        </h1>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No products found for "{currentCategory}" 😢
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>

        {/* Back Button */}
        <div className="text-center mt-10">
          <Link
            to={backButton.link}
            className={`text-lg transition ${
              isDarkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {backButton.text}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesPage;