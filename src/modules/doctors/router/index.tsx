import { RouteObject } from "react-router-dom";

import AppointmentPage from "../pages/AppointmentPage";
import EndAppointmentPage from "../pages/EndAppointmentPage";
import HistoryPage from "../pages/HistoryPage";
import MedicalSummariesPage from "../pages/MedicalSummariesPage";
import MedicalSummaryPage from "../pages/MedicalSummaryPage";
import TemplateDoctors from "../";

const DoctorRoutes: RouteObject = {
  path: "/doctor",
  element: <TemplateDoctors />,
  children: [
    { path: "ver_citas", element: <AppointmentPage /> },
    { path: "finalizar_cita/:citaId", element: <EndAppointmentPage /> },
    { path: "ver_resumenes", element: <HistoryPage /> },
    { path: "listado_resumenes/:historyId", element: <MedicalSummariesPage /> },
    { path: "ver_resumen/:resumenId", element: <MedicalSummaryPage /> },
  ],
};

export default DoctorRoutes;
