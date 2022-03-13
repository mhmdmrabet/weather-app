import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({
  children,
  userToken,
}: {
  children: JSX.Element;
  userToken: string;
}) {
  let location = useLocation();

  if (!userToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
