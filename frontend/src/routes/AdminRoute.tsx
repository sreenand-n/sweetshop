import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { ReactNode } from "react";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user } = useContext(AuthContext);

  if (!user || user.is_admin !== true) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
