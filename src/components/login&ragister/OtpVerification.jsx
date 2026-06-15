import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeProvider";

const OtpVerification = () => {
  const { isDarkMode } = useTheme();

  const { state } = useLocation();
  const navigate = useNavigate();

  const identifier = state?.identifier;
  const password = state?.password;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  // Focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // OTP Input Change
  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Move next
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Backspace Move
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      return setMessage("Please enter all 6 digits");
    }

    try {
      setLoading(true);

      const res = await fetch("https://easybook.naimdev.com/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          identifier,
          otp: enteredOtp,
          password,
        }),
      });

      const data = await res.json();

      setMessage(data.message);

      if (res.ok) {
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }
    } catch (error) {
      setMessage("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (timer === 0) {
      try {
        await fetch("https://easybook.naimdev.com/resend-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            identifier,
          }),
        });

        setOtp(["", "", "", "", "", ""]);
        setTimer(60);

        setMessage("OTP resent successfully!");
      } catch (error) {
        setMessage("Failed to resend OTP");
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-10 transition-all duration-300 pt-35 ${isDarkMode
        ? "bg-gradient-to-b from-gray-950 via-gray-900 to-black"
        : "bg-gradient-to-b from-blue-50 via-white to-indigo-100"
        }`}
    >
      <div
        className={`w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border transition-all duration-300 ${isDarkMode
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
          }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            OTP Verification
          </h1>

          <p className="text-blue-100 mt-2 text-sm">
            Verify your EasyShop account
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          <p
            className={`text-center mb-6 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
          >
            Enter the 6-digit OTP sent to
            <br />

            <span className="font-semibold text-blue-600 break-all">
              {identifier}
            </span>
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(index, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 rounded-xl text-center text-xl font-bold outline-none border transition-all duration-300 ${isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                  : "bg-gray-50 border-gray-300 text-gray-800 focus:border-indigo-500"
                  }`}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={otp.join("").length < 6 || loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
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

          {/* Timer */}
          <div className="mt-6 text-center">
            {timer > 0 ? (
              <p
                className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                Resend OTP in{" "}
                <span className="font-semibold text-blue-600">
                  {timer}s
                </span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-blue-600 font-semibold hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Back Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/register")}
              className={`text-sm hover:underline ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Back to Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;