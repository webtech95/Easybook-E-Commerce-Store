// src/pages/Profile.jsx
import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../ThemeProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
    const { user, logout, updateProfile } = useAuth();
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        dob: user?.dob || "",
        city: user?.city || "",
        phone: user?.phone || "",
        address: user?.address || "",
        profilePic: user?.profilePic || "",
    });

    if (!user) {
        navigate("/login");
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilePic: reader.result });
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
        toast.info("Logged out");
        navigate("/");
    };

    return (
        <div
            className={`min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
        >
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Profile</h1>
                </div>

                {/* Profile Card */}
                <div
                    className={`rounded-xl shadow-md border overflow-hidden
          ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
                >
                    {/* Profile Picture */}
                    <div className="flex justify-center pt-8">
                        <div className="relative">
                            <img
                                src={formData.profilePic || "https://via.placeholder.com/150?text=No+Image"}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                            />
                            {isEditing && (
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute bottom-0 right-0 bg-indigo-600 p-1 rounded-full text-white hover:bg-indigo-700"
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

                    {/* Details Form */}
                    <div className="p-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className={`mt-1 w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-indigo-500 outline-none
                    ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                                    />
                                ) : (
                                    <p className="mt-1 text-lg">{user.name || "Not provided"}</p>
                                )}
                            </div>

                            <div>
                                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Date of Birth
                                </label>
                                {isEditing ? (
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        required
                                        className={`mt-1 w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-indigo-500 outline-none
                    ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                                    />
                                ) : (
                                    <p className="mt-1">{user.dob || "Not provided"}</p>
                                )}
                            </div>

                            <div>
                                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Phone Number
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone.replace(/[^0-9]/g, "")}
                                        onChange={handleChange}
                                        required

                                        className={`mt-1 w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-indigo-500 outline-none
                    ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                                        className={`mt-1 w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-indigo-500 outline-none
                    ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                                    />
                                ) : (
                                    <p className="mt-1">{user.phone || "Not provided"}</p>
                                )}
                            </div>

                            <div>
                                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    City
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`mt-1 w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-indigo-500 outline-none
                    ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                                    />
                                ) : (
                                    <p className="mt-1">{user.city || "Not provided"}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                Address
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="address"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className={`mt-1 w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-indigo-500 outline-none
                  ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                                />
                            ) : (
                                <p className="mt-1 whitespace-pre-wrap">{user.address || "Not provided"}</p>
                            )}
                        </div>
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="hover:bg-indigo-400 text-white p-1 rounded-full transition top-45 right-74 m-4 absolute"
                        >
                            <span className="hidden sm:inline">📝</span>
                        </button>
                    ) : (
                        <div className="space-x-3 text-center mb-4">
                            <button
                                onClick={handleSave}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;