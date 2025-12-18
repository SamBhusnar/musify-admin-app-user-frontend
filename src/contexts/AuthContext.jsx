import axios from "axios";
import React from "react";
import { createContext, useState, useContext } from "react";
import { API_BASE_URL } from "../App";
export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  // create state usertoken
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        setUser({
          email: response.data.email,
          role: response.data.role,
        });
        setToken(response.data.token);
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            email: response.data.email,
            role: response.data.role,
          })
        );
        return {
          success: true,
          message: "Login Successfully",
        };
      } else {
        return {
          success: false,
          message: response.data?.message || "Login Failed",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Something went wrong please try again",
      };
    }
  };
  const [loading, setLoading] = useState(false);
  const isAuthenticated = () => {
    return !!token && !!user;
  };
  const isAdmin = () => {
    return user && user.role === "ADMIN";
  };
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setUser(null);
    setToken(null);
  };
  const contextValue = {
    user,
    isAuthenticated,
    isAdmin,
    logout,
    token,
    loading,
    login,
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const storedUser = localStorage.getItem("adminUser");
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
