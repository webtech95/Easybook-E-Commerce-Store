import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeProvider";

const Register = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!identifier.trim()) {
      return setMessage("Please enter your email.");
    }

    if (!password.trim()) {
      return setMessage("Please create a password.");
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        "https://easybook.naimdev.com/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: identifier.trim(),
          }),
        }
      );

      const data = await res.json();

      setMessage(data.message);

      if (res.ok) {
        navigate("/verify-otp", {
          state: {
            identifier: identifier.trim(),
            password,
          },
        });
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-10 pt-35 transition-all duration-300 ${isDarkMode
        ? "bg-gradient-to-b from-gray-950 via-gray-900 to-black"
        : "bg-gradient-to-b from-blue-50 via-white to-indigo-100"
        }`}
    >
      <div
        className={`w-full max-w-md rounded-3xl shadow-2xl border overflow-hidden transition-all duration-300 ${isDarkMode
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
          }`}
      >
        {/* Header */}
        <div className="p-8 text-center">
          <h1
            className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"
              }`}
          >
            EasyShop Register
          </h1>

          <p
            className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
          >
            Create your account with OTP verification
          </p>
        </div>

        {/* FORM */}
        <form className="p-8" onSubmit={handleSendOTP}>
          {/* Email */}
          <div className="mb-5">
            <label
              className={`block mb-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 ${isDarkMode
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-500"
                }`}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              className={`block mb-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 ${isDarkMode
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-500"
                }`}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-center text-sm mt-5 ${isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
            >
              {message}
            </p>
          )}

          {/* Login */}
          <div className="text-center mt-6">
            <p
              className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
            >
              Already have an account?
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-2 text-blue-600 font-semibold hover:underline"
            >
              Go to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;