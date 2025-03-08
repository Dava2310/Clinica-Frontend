import { RouteObject } from "react-router-dom";
import TemplateDoctors from "../../components/modules/doctors";

import Citas from "../../components/modules/doctors/modules/Citas";
import FinalizarCita from "../../components/modules/doctors/modules/FinalizarCita";
import ResumenesMedicos from "../../components/modules/doctors/modules/ResumenesMedicos";
import ListadoResumenes from "../../components/modules/doctors/modules/ListadoResumenes";
import VerResumen from "../../components/modules/doctors/modules/VerResumen";

const DoctorRoutes: RouteObject = {
  path: "/doctor",
  element: <TemplateDoctors />,
  children: [
    { path: "ver_citas", element: <Citas /> },
    { path: "finalizar_cita/:citaId", element: <FinalizarCita /> },
    { path: "ver_resumenes", element: <ResumenesMedicos /> },
    { path: "listado_resumenes/:resumenId", element: <ListadoResumenes /> },
    { path: "ver_resumen/:resumenId", element: <VerResumen /> },
  ],
};

export default DoctorRoutes;
