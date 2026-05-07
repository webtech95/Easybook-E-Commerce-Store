// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../ThemeProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      toast.success("Logged in successfully!");
      navigate("/profile");
    } else {
      toast.error("Please enter email and password");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300
      ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div
        className={`max-w-md w-full p-8 rounded-xl shadow-md border
        ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <h1 className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none
              ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none
              ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Sign In
          </button>
        </form>
        <p className={`text-center text-sm mt-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Demo: any email & password works
        </p>
        <div className="text-center mt-4">
          <Link to="/home" className="text-indigo-500 hover:underline text-sm">
            ← Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;