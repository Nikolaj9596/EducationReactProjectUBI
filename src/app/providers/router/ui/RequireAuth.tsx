import {
  getUserAuthData,
  getUserRoles,
  UserRole,
} from "../../../../entities/User";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { RoutePath } from "../../../../shared/const/router";

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}
const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const location = useLocation();
  const auth = useSelector(getUserAuthData);
  const userRoles = useSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }
    return roles.some((requireRole) => {
      return userRoles?.includes(requireRole);
    });
  }, [roles, userRoles]);

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return (
      <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />
    );
  }
  return children;
};

export default RequireAuth;
