"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || !allowedRoles.includes(role)) {
        router.replace("/"); // or redirect to custom /403
      }
    }
  }, [user, role, loading]);

  if (loading || !user || !allowedRoles.includes(role)) {
    return null; // or return a loading spinner
  }

  return children;
};

export default ProtectedRoute;
