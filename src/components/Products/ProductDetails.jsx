import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Products } from "./productitems";
import { useTheme } from "../ThemeProvider";
import { useCart } from "../Context/cartContext.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();


  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = Products.find(
      (p) => p.id === parseInt(id)
    );

    if (foundProduct) {
      setProduct(foundProduct);

      const related = Products.filter(
        (p) =>
          p.category === foundProduct.category &&
          p.id !== foundProduct.id
      ).slice(0, 4);

      setRelatedProducts(related);
    } else {
      setProduct(null);
    }
  }, [id]);

  const handleAddToCart = () => {
    addToCart({...product, quantity});
    toast.success("Added to cart");

  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Product not found
          </h2>
          <Link
            to="/books"
            className="text-indigo-600 dark:text-indigo-400 underline mt-2 inline-block"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <div
      className={`min-h-screen pt-40 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto">
        {/*===== MAIN PRODUCT ===== */}
        <div
          className={`flex flex-col lg:flex-row gap-12 rounded-2xl p-6 border shadow-md
          ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
        >
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover aspect-[3/2]"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:w-1/2 space-y-5">

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                {product.name}
              </h1>

              <p className="text-lg mt-2 capitalize">
                Category : {product.category}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">
                ₹{product.price}
              </span>

              <span className="text-lg line-through text-gray-500">
                ₹{product.oldPrice}
              </span>

              <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm px-2 py-1 rounded">
                {discountPercent}% OFF
              </span>
            </div>

            {/* Description */}
            <p className="leading-relaxed ">
              Dive into the world of "{product.name}". Perfect for {product.category} lovers.
              A must-have for your collection.
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>

              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`w-8 h-8 transition
                          ${isDarkMode
                      ? "bg-gray-700 text-white hover:bg-indigo-500"
                      : "bg-gray-100 text-gray-900 hover:bg-indigo-500 hover:text-white"
                    }`}                >
                  -
                </button>

                <span className="px-4">{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`w-8 h-8 transition
                          ${isDarkMode
                      ? "bg-gray-700 text-white hover:bg-indigo-500"
                      : "bg-gray-100 text-gray-900 hover:bg-indigo-500 hover:text-white"
                    }`}                >
                  +
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 
              text-white font-semibold py-3 px-8 rounded-full 
              shadow-lg hover:shadow-indigo-500/30 
              transition-all transform hover:scale-105"
            >
              Add to Cart 🛒
            </button>

            {/* Extra */}
            <div className="border-t pt-5 mt-5">
              <h3 className="font-semibold">Product Details:</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Free shipping on orders over ₹999</li>
                <li>30-day return policy</li>
                <li>Premium quality print</li>
              </ul>
            </div>

          </div>
        </div>

        {/* ===== RELATED PRODUCTS ===== */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">

            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              📚 You May Also Like
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/product/${rel.id}`}
                  className={`group rounded-xl overflow-hidden border transition
                  ${isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                    }`}
                >
                  <div className="aspect-[3/2] bg-gray-100 dark:bg-gray-900">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {rel.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                        ₹{rel.price}
                      </span>
                      <span className="text-gray-500 text-xs line-through">
                        ₹{rel.oldPrice}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;