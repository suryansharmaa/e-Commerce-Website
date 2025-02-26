import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      if (
        !location.pathname.includes("/login") &&
        !location.pathname.includes("/register")
      ) {
        setRedirect("/auth/login");
      }
    } else if (isAuthenticated) {
      if (
        location.pathname.includes("/login") ||
        location.pathname.includes("/register")
      ) {
        if (user?.role === "admin") {
          setRedirect("/admin/dashboard");
        } else {
          setRedirect("/shopping/home");
        }
      } else if (
        user?.role !== "admin" &&
        location.pathname.includes("admin")
      ) {
        setRedirect("/unauth-page");
      } else if (user?.role === "admin" && location.pathname.includes("shop")) {
        setRedirect("/admin/dashboard");
      }
    }
  }, [isAuthenticated, user, location.pathname]);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return <>{children}</>;
}
