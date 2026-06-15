import { useCart } from "../context/cartContext.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../ThemeProvider";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  if (!product) return null;

  const isValid =
    product?.id &&
    product?.name &&
    !isNaN(Number(product.price));

  const handleAddToCart = () => {
    if (!isValid) {
      toast.error("Invalid product");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: 1,
    });

    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    if (!isValid) {
      toast.error("Invalid product");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: 1,
    });

    toast.success("Proceeding to checkout");

    navigate("/checkout");
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1
      w-full h-full flex flex-col
      ${
        isDarkMode
          ? "bg-gray-800 text-white shadow-md hover:shadow-2xl"
          : "bg-white text-gray-900 shadow-lg hover:shadow-2xl"
      }`}
    >
      {/* Product Image */}
      <div
        className={`relative w-full overflow-hidden
        h-52 sm:h-60 md:h-72
        ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
      >
        <img
          src={
            product.image ||
            "https://via.placeholder.com/300x400?text=No+Image"
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Sale Badge */}
        {product.oldPrice &&
          Number(product.oldPrice) > Number(product.price) && (
            <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
              SALE
            </span>
          )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        {/* Product Name */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-2 min-h-[20px]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          {product.oldPrice &&
            Number(product.oldPrice) > Number(product.price) && (
              <p className="text-xs sm:text-sm line-through text-gray-400">
                ₹{product.oldPrice}
              </p>
            )}

          <p className="text-lg sm:text-xl font-bold text-indigo-500">
            ₹{product.price}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          {/* Add To Cart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={!isValid}
            className={`w-full py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium transition
            ${
              isDarkMode
                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }
            disabled:opacity-50`}
          >
            Add to Cart
          </button>

          {/* Buy Now */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBuyNow();
            }}
            disabled={!isValid}
            className={`w-full py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium transition
            ${
              isDarkMode
                ? "bg-gray-700 hover:bg-green-600 text-white"
                : "bg-gray-200 hover:bg-green-600 hover:text-white text-gray-800"
            }
            disabled:opacity-50`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;