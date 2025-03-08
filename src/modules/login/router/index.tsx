import { RouteObject } from "react-router-dom";
import ProtectedLogin from "../components/ProtectedLogin";
import Login from "../pages";

const AuthRoutes: RouteObject = {
  path: "/login",
  element: (
    <ProtectedLogin>
      <Login />
    </ProtectedLogin>
  ),
};

export default AuthRoutes;
