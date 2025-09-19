// import { Navigate } from "react-router-dom";
// import { useAuth } from '../context/AuthContext';

// const ProtectedRouts = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div className="flex justify-center items-center min-h-[60vh]"><div className="loader"></div></div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRouts;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRouts = ({ children }) => {
  const { user, loading } = useAuth();

  // While auth state is being determined, show a small loader (or null)
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, render the protected children
  return children;
};

export default ProtectedRouts;
