import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { getCookie } from "../../../utils/cookies";
import { nameCookieSessionApp } from "../../../config";

type PropsProtectedRouteLogin = { children: ReactNode };

const ProtectedLogin = ({ children }: PropsProtectedRouteLogin) => {
  const location = useLocation();
  const token = getCookie(nameCookieSessionApp);

  if (token && location.pathname.includes("/login")) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedLogin;
