import { useCart } from "../Context/cartContext.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../ThemeProvider";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isDarkMode } = useTheme();

  if (!product) return null;

  const isValid =
    product?.id &&
    product?.name &&
    !isNaN(Number(product.price)
    );

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
    });

    toast.info("Proceeding to checkout...");
  };

  return (
    <div
      className={`p-4 rounded-xl shadow transition-all duration-300
      ${isDarkMode
          ? "bg-gray-800 text-white shadow-md"
          : "bg-white text-gray-900 shadow-lg"
        }`}
    >
      {/* Image */}
      <div
        className={`relative w-full h-72 flex items-center justify-center overflow-hidden rounded-lg
        ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="overflow-hidden w-full mt-4">
        <h3 className="text-lg font-semibold truncate">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          {product.oldPrice &&
            Number(product.oldPrice) > Number(product.price) && (
              <p className="text-sm line-through text-gray-400">
                ₹{product.oldPrice}
              </p>
            )}

          <p className="text-lg font-bold">
            ₹{product.price}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={handleAddToCart}
          disabled={!isValid}
          className={`w-full py-2 rounded-full font-medium transition
          ${isDarkMode
              ? "bg-indigo-500 hover:bg-indigo-600 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
            } disabled:opacity-50`}
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          disabled={!isValid}
          className={`w-full py-2 rounded-full font-medium transition
          ${isDarkMode
              ? "bg-gray-700 hover:bg-green-500 text-white"
              : "bg-gray-200 hover:bg-green-500 hover:text-white text-gray-800"
            } disabled:opacity-50`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;