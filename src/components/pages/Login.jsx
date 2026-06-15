// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeProvider.jsx";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isDarkMode } = useTheme();
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://easybook.naimdev.com/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          identifier: email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Update AuthContext
        login(email, password);

        // Save backend user
        localStorage.setItem(
          "easyshopUser",
          JSON.stringify(data.user)
        );

        toast.success(data.message || "Login successful");

        // Redirect
        if (location.state?.fromCheckout) {
          navigate("/checkout");
        } else {
          navigate("/");
        }

      } else {
        toast.error(data.message || "Login failed");
      }

    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 pt-35
      ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div
        className={`max-w-md w-full p-8 rounded-2xl shadow-xl border transition-all duration-300
        ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome Back
          </h1>

          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Sign in to continue shopping
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition
              focus:ring-2 focus:ring-indigo-500
              ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition
              focus:ring-2 focus:ring-indigo-500
              ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]
            text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Register */}
        <p
          className={`text-center text-sm mt-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-500 hover:text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Back */}
        <div className="text-center mt-5">
          <Link
            to="/home"
            className="text-sm text-indigo-500 hover:text-indigo-600 hover:underline"
          >
            ← Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;