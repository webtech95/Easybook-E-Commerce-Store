import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeProvider";

const Welcome = ({ onClose }) => {
  const navigate = useNavigate();
  
  const { isDarkMode } = useTheme();

  const handleLogin = () => {
    localStorage.setItem("visited", "true");

    if (onClose) {
      onClose();
    }

    navigate("/login");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div
        className={`w-full max-w-md rounded-3xl p-8 shadow-2xl transition-all
        ${
          isDarkMode
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`ml-auto flex items-center justify-center w-9 h-9 rounded-full transition
          ${
            isDarkMode
              ? "hover:bg-gray-800"
              : "hover:bg-gray-100"
          }`}
        >
          ✕
        </button>

        {/* Content */}
        <div className="text-center mt-2">
          <h1 className="text-3xl font-bold mb-3">
            Welcome to EasyBook
          </h1>

          <p
            className={`text-sm leading-6 mb-8
            ${
              isDarkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Discover your favorite books and enjoy
            a smooth shopping experience.
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition"
            >
              Login / Register
            </button>

            <button
              onClick={onClose}
              className={`w-full py-3 rounded-xl font-medium transition
              ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;