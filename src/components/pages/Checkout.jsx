import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cartContext";
import { useTheme } from "../ThemeProvider";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { isDarkMode } = useTheme();

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      toast.warn("Your cart is empty. Add some items before checkout.");
      navigate("/books");
    }
  }, [cart, navigate]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 500 ? 0 : 40;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!formData.city.trim()) newErrors.city = "Required";
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Invalid pincode";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = async () => {
    if (!validateForm()) {
      toast.error("Fix form errors");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      toast.success("Order placed!");
      navigate("/order-confirmation");
      setIsProcessing(false);
    }, 1500);
  };

  if (cart.length === 0) return null;

  return (
    <div
      className={`min-h-screen pt-20 pb-12 transition-colors duration-300
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ===== FORM ===== */}
          <div className="flex-1">
            <div
              className={`rounded-xl p-6 shadow-md border
              ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            >
              <h2 className="text-xl font-semibold mb-4">
                Shipping Information
              </h2>

              <div className="space-y-4">

                {/* Input Field */}
                {[
                  { name: "fullName", placeholder: "Full Name" },
                  { name: "email", placeholder: "Email" },
                  { name: "address", placeholder: "Address" },
                ].map((field) => (
                  <div key={field.name}>
                    <input
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-md border outline-none transition
                      ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-indigo-400"
                          : "bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500"
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                    )}
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className={`px-4 py-3 rounded-md border
                    ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />
                  <input
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`px-4 py-3 rounded-md border
                    ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md border
                  ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
            </div>
          </div>

          {/* ===== SUMMARY ===== */}
          <div className="w-full lg:w-96">
            <div
              className={`rounded-xl p-6 shadow-md border sticky top-24
              ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            >
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={isProcessing}
                className={`mt-6 w-full py-3 rounded-md font-semibold transition
                ${
                  isProcessing
                    ? "bg-gray-400"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;