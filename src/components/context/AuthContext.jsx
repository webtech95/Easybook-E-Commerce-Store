// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSession = localStorage.getItem("easybook_current_user");
    if (storedSession) {
      const { email } = JSON.parse(storedSession);
      const profile = localStorage.getItem(`easybook_profile_${email}`);
      if (profile) {
        setUser(JSON.parse(profile));
      } else {
        // fallback if profile missing (shouldn't happen)
        setUser({ email });
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (!email || !password) return false;

    // Check if profile already exists for this email
    const existingProfile = localStorage.getItem(`easybook_profile_${email}`);
    let userData;
    if (existingProfile) {
      userData = JSON.parse(existingProfile);
    } else {
      // Create new profile with empty fields
      userData = {
        id: "user_" + Date.now(),
        email,
        name: "",
        dob: "",
        city: "",
        phone: "",
        address: "",
        profilePic: "",
      };
      localStorage.setItem(`easybook_profile_${email}`, JSON.stringify(userData));
    }
    // Save current session (only email, not full data)
    localStorage.setItem("easybook_current_user", JSON.stringify({ email }));
    setUser(userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("easybook_current_user");
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    if (!user) return;
    const newUser = { ...user, ...updatedData };
    // Save to profile storage under email key
    localStorage.setItem(`easybook_profile_${user.email}`, JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};