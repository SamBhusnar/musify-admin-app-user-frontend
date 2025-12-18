import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fill in all details");
      return;
    }
    setLoading(true);
    try {
      console.log(email, password);
      const result = await login(email, password);
      if (result.success) {
        toast.success(result.message);
        navigate("/add-song");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message || "Unexpected error occured try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Headers */}
        <div className="text-center">
          <div className="flex items-cener justify-center mb-6">
            <img src={assets.logo} alt="logo" className="h-12 w-12" />
            <h1 className="ml-3 text-3xl font-bold text-white">Musify</h1>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            <p className="text-gray-300  ">
              Sign in to manage your music library
            </p>
          </h2>
        </div>
        {/* Form */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* email field */}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200  mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target?.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300  "
                />
              </div>
            </div>
            {/* password field */}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target?.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300  "
                />
              </div>
            </div>
            {/* Login button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full flex  justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium  text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500   disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
