import { RouteObject } from "react-router-dom";
import TemplatePatients from "../index";

import CreateAppointmentPage from "../pages/CreateAppointmentPage";
import ApproveAppointmentPage from "../pages/ApproveAppointmentPage";
import AppointmentsPage from "../pages/AppointmentPage";
import AppointmentPage from "../../administrator/pages/AppointmentPage";

// import ListadoResumenesByPaciente from "../../components/modules/patients/modules/ListadoResumenesByPaciente";
// import VerResumenByPaciente from "../../components/modules/patients/modules/VerResumenByPaciente";

const PatientRoutes: RouteObject = {
  path: "/paciente",
  element: <TemplatePatients />,
  children: [
    { path: "solicitar_cita", element: <CreateAppointmentPage /> },
    { path: "ver_citas", element: <AppointmentsPage /> },
    { path: "aprobar_cita/:citaId", element: <ApproveAppointmentPage /> },
    { path: "ver_cita/:citaId", element: <AppointmentPage /> },

    // { path: "ver_resumenes", element: <ListadoResumenesByPaciente /> },
    // { path: "ver_resumen/:resumenId", element: <VerResumenByPaciente /> },
  ],
};

export default PatientRoutes;
