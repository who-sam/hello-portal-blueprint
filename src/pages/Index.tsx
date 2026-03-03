import { Navigate } from "react-router-dom";
import AuthPage from "./AuthPage";

const Index = () => {
  const hasRole = localStorage.getItem("kernel-role");
  if (hasRole) return <Navigate to="/dashboard" replace />;
  return <AuthPage />;
};

export default Index;
