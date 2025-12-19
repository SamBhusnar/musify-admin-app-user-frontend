import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    console.log("inside is loading ");

    return (
      <div className="min-h-screen bg-gradient-to-br   from-slate-900 to-slate-800 via-purple-900  flex items-center justify-center">
        <div className="text-center ">
          <div className="animate-spin  rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">loading...</p>
        </div>
      </div>
    );
  }

  if (requireAdmin && !isAdmin()) {
    console.log("inside req. and isadmin");
    return (
      <div className="min-h-screen bg-gradient-to-br   from-slate-900 to-slate-800 via-purple-900  flex items-center justify-center">
        <div className="text-center ">
          <div className="text-2xl font-bold text-white mb-4">
            {" "}
            Access Denied
          </div>
          <p className="text-white text-lg">
            You need admin privilages to access this page.
          </p>
          {/* redirect to login  after 5 second */}
          <p className="text-white text-sm">
            You will be redirected to login page in {5 - time} second
            {time > 1 && "s"}
          </p>
          {time > 5 && <Navigate to="/login" replace />}
        </div>
      </div>
    );
  }
  if (!isAuthenticated()) {
    console.log(isAuthenticated());

    return <Navigate to="/login" replace />;
  }
  // console.log("inside in protected route");

  return children;
}

export default ProtectedRoute;
