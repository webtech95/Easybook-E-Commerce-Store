import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTheme } from "../ThemeProvider";

const Contact = () => {
  const { isDarkMode } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
  };

  return (
    <div
      className={`pt-40 transition-colors duration-300
      ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
    >
      {/* ===== Main Section ===== */}
      <section className="max-w-3xl mx-auto pb-16 px-4">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Contact{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            EasyBook
          </span>
        </h1>

        {/* ===== Contact Form ===== */}
        <form
          onSubmit={handleSubmit}
          className={`rounded-xl p-8 space-y-6 shadow-md border transition
          ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg border outline-none transition
            ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400"
                : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500"
            }`}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg border outline-none transition
            ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400"
                : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500"
            }`}
          />

          {/* Subject */}
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border outline-none transition
            ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400"
                : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500"
            }`}
          />

          {/* Message */}
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg border outline-none transition
            ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400"
                : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500"
            }`}
          ></textarea>

          {/* Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition
            ${
              isDarkMode
                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Send Message
          </button>
        </form>
      </section>

      {/* ===== Contact Info ===== */}
      <div
        className={`max-w-5xl mx-auto px-4 pb-20`}
      >
        <div
          className={`grid md:grid-cols-3 gap-6 p-6 rounded-xl border text-center shadow-md
          ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Email */}
          <div className="flex flex-col items-center gap-2">
            <Mail className="w-6 h-6 text-indigo-500" />
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              support@easybook.com
            </p>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center gap-2">
            <Phone className="w-6 h-6 text-indigo-500" />
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              +91 98765 43210
            </p>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center gap-2">
            <MapPin className="w-6 h-6 text-indigo-500" />
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              123 EasyBook Street, Mumbai, India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;