import React from "react";
import { useCart } from "../context/cartContext.jsx";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeProvider";

export default function CartPage() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
  const { isDarkMode } = useTheme();

  return (
    <div className={` min-h-screen transition-colors duration-300
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div
        className={`max-w-6xl mx-auto px-4 py-10 pt-40 transition-colors duration-300
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
      >
        {/* Heading */}
        <h1 className="text-3xl text-center font-bold mb-10">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-center`}>
            Your cart is empty.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {/* ===== CART ITEMS ===== */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition
                ${isDarkMode
                      ? "bg-gray-800 border-gray-700 shadow-md"
                      : "bg-white border-gray-200 shadow-sm"
                    }`}
                >
                  {/* Image */}
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ₹{item.price}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className={`w-8 h-8 rounded-full transition
                          ${isDarkMode
                            ? "bg-gray-700 text-white hover:bg-indigo-500"
                            : "bg-gray-100 text-gray-900 hover:bg-indigo-500 hover:text-white"
                          }`}
                      >
                        -
                      </button>

                      <span className="px-2">{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className={`w-8 h-8 rounded-full transition
${isDarkMode
                            ? "bg-gray-700 text-white hover:bg-indigo-500"
                            : "bg-gray-100 text-gray-900 hover:bg-indigo-500 hover:text-white"
                          }`}                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm mt-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ===== SUMMARY ===== */}
            <div
              className={`p-5 rounded-xl border shadow-md space-y-4
            ${isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
                }`}
            >
              <h2 className="text-lg font-semibold">
                Order Summary
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>₹50</span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>

                <div
                  className={`p-2 rounded-md font-bold flex justify-between
                ${isDarkMode
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-100 text-indigo-600"
                    }`}
                >
                  <span>Total</span>
                  <span>₹{(cartTotal - 50).toFixed(2)}</span>
                </div>
              </div>

              <Link to="/checkout">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}