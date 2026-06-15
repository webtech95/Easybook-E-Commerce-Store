// src/Cart/Cart.jsx
import { useCart } from "../context/cartContext.jsx";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeProvider";
import { toast } from "react-toastify";


const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  const handleCheckout = () => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));

    const user = localStorage.getItem("user");

    if (!user) {
      toast.error("Please login first");

      // delay navigation
      setTimeout(() => {
        navigate("/login", {
          state: { fromCheckout: true },
        });
      }, 1500);

      return;
    }

    navigate("/checkout");
  };

  return (
    <div className={`transition-colors duration-300
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div
        className={`max-w-6xl mx-auto px-4 py-12 pt-35 `}
      >
        <h1 className="text-3xl font-bold text-center mb-10">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className={`text-center`}>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-4`}>
              Your cart is empty.
            </p>
            <button
              onClick={() => navigate("/Products")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-8 flex flex-col">
            {/* Cart Items */}
            <div className="grid gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}  // ✅ simplified key – no size/color
                  className={`flex flex-col sm:flex-row items-center gap-6 p-5 rounded-xl border transition
                ${isDarkMode
                      ? "bg-gray-800 border-gray-700 shadow-md"
                      : "bg-white border-gray-200 shadow-sm"
                    }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      ₹{item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center sm:justify-start mt-3 gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-indigo-500 hover:text-white transition"
                      >
                        -
                      </button>
                      <span className="px-3 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-indigo-500 hover:text-white transition"
                      >
                        +
                      </button>


                    </div>


                  </div>

                  <div className="text-center sm:text-right space-y-2">
                    <p className="font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}


            </div>

            {/* Total Section */}
            <div
              className={`mt-10 p-6 rounded-xl border shadow-md
            ${isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
                }`}
            >
              <h2 className="text-xl font-bold mb-4">
                Total: ₹{totalPrice.toFixed(2)}
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold transition"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className={`w-full py-3 rounded-md font-semibold transition
                ${isDarkMode
                      ? "bg-gray-700 hover:bg-red-500 hover:text-white"
                      : "bg-gray-200 hover:bg-red-500 hover:text-white"
                    }`}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );

  console.log(cart);
};

export default Cart; 
