import { RouteObject } from "react-router-dom";
import TemplatePatients from "../index";

import CreateAppointmentPage from "../pages/CreateAppointmentPage";
import ApproveAppointmentPage from "../pages/ApproveAppointmentPage";
import AppointmentsPage from "../pages/AppointmentPage";
import AppointmentPage from "../../administrator/pages/AppointmentPage";
import SummaryListPage from "../pages/SummaryListPage";
import SummaryPage from "../pages/SummaryPage";

const PatientRoutes: RouteObject = {
  path: "/paciente",
  element: <TemplatePatients />,
  children: [
    { path: "solicitar_cita", element: <CreateAppointmentPage /> },
    { path: "ver_citas", element: <AppointmentsPage /> },
    { path: "aprobar_cita/:citaId", element: <ApproveAppointmentPage /> },
    { path: "ver_cita/:citaId", element: <AppointmentPage /> },
    { path: "ver_resumenes", element: <SummaryListPage /> },
    { path: "ver_resumen/:resumenId", element: <SummaryPage /> },
  ],
};

export default PatientRoutes;
