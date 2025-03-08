import { RouteObject } from "react-router-dom";
import TemplatePatients from "../../components/modules/patients";

import ViewCitas from "../../components/modules/patients/modules/ViewCitas";
import CreateCitas from "../../components/modules/patients/modules/CreateCitas";
import AprobarCita from "../../components/modules/patients/modules/AprobarCita";

import ListadoResumenesByPaciente from "../../components/modules/patients/modules/ListadoResumenesByPaciente";
import VerResumenByPaciente from "../../components/modules/patients/modules/VerResumenByPaciente";

const PatientRoutes: RouteObject = {
  path: "/paciente",
  element: <TemplatePatients />,
  children: [
    { path: "solicitar_cita", element: <CreateCitas /> },
    { path: "ver_citas", element: <ViewCitas /> },
    { path: "aprobar_cita/:citaId", element: <AprobarCita /> },
    { path: "ver_resumenes", element: <ListadoResumenesByPaciente /> },
    { path: "ver_resumen/:resumenId", element: <VerResumenByPaciente /> },
  ],
};

export default PatientRoutes;
