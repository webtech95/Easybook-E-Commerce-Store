// src/pages/Profile.jsx
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../ThemeProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logout, updateProfile, loading } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    city: "",
    phone: "",
    address: "",
    profilePic: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Fill form when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        dob: user.dob || "",
        city: user.city || "",
        phone: user.phone || "",
        address: user.address || "",
        profilePic: user.profilePic || "",
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        Loading...
      </div>
    );
  }

  if (!user) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePic: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile(formData);

    setIsEditing(false);

    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      dob: user.dob || "",
      city: user.city || "",
      phone: user.phone || "",
      address: user.address || "",
      profilePic: user.profilePic || "",
    });

    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <div
      className={`min-h-screen pt-28 pb-10 px-4 transition-colors duration-300 pt-35
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Card */}
        <div
          className={`rounded-2xl shadow-xl border overflow-hidden
          ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Profile Image */}
          <div className="flex justify-center pt-8">
            <div className="relative">
              <img
                src={
                  formData.profilePic ||
                  "https://via.placeholder.com/150?text=Profile"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
              />

              {isEditing && (
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition"
                >
                  📷
                </button>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500
                    ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />
                ) : (
                  <p>{user.name || "Not provided"}</p>
                )}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date of Birth
                </label>

                {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500
                    ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />
                ) : (
                  <p>{user.dob || "Not provided"}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>

                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500
                    ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />
                ) : (
                  <p>{user.phone || "Not provided"}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  City
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500
                    ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />
                ) : (
                  <p>{user.city || "Not provided"}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Address
              </label>

              {isEditing ? (
                <textarea
                  name="address"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500
                  ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              ) : (
                <p className="whitespace-pre-wrap">
                  {user.address || "Not provided"}
                </p>
              )}
            </div>

            {/* Buttons */}
            {isEditing && (
              <div className="flex justify-center gap-4 pt-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Save
                </button>

                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;