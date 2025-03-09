import { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Main from "../modules/main";
import ErrorPage from "../modules/common/components/Error";

import AdminRoutes from "../modules/administrator/router";
// import PatientRoutes from "../modules/patients/router";
import DoctorRoutes from "../modules/doctors/router";
import AuthRoutes from "../modules/login/router";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [AdminRoutes, DoctorRoutes],
  },
  AuthRoutes, // No necesita `children`
];

export default routes;
