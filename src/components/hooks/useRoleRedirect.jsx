import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const redirectMap = {
  co_manager: "/co_manager",
  manager: "/manager",
  parent: "/parent",
  teacher: "/teacher",
};

const useRoleRedirect = (targetRoles) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const userRole = user?.role;
  useEffect(() => {
    if (!targetRoles.find((role) => role === userRole)) {
      const redirectPath = redirectMap[userRole] || "/signin";
      navigate(redirectPath);
    }
  }, [userRole, targetRoles]);
};

export default useRoleRedirect;
