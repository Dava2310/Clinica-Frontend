import { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Main from "../components/main/Main";
import ErrorPage from "../components/pages/ErrorPage";

import AdminRoutes from "../modules/admin/router";
import PatientRoutes from "../modules/patients/router";
import DoctorRoutes from "../modules/doctors/router";
import AuthRoutes from "../modules/auth/router";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [AdminRoutes, PatientRoutes, DoctorRoutes],
  },
  AuthRoutes, // No necesita `children`
];

export default routes;
