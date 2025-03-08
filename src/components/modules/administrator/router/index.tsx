import { RouteObject } from "react-router-dom";
import TemplateAdministrator from "../../components/modules/administrator";

import CreateDoctor from "../../components/modules/administrator/modules/doctors/CreateDoctor";
import ModifyDoctor from "../../components/modules/administrator/modules/doctors/ModifyDoctor";
import SeeDoctor from "../../components/modules/administrator/modules/doctors/SeeDoctor";

import CreatePatient from "../../components/modules/administrator/modules/patients/CreatePatient";
import ModifyPatient from "../../components/modules/administrator/modules/patients/ModifyPatient";
import SeePatient from "../../components/modules/administrator/modules/patients/SeePatient";

import SeeAdmin from "../../components/modules/administrator/modules/adminitrators/SeeAdmin";
import CreateAdmin from "../../components/modules/administrator/modules/adminitrators/CreateAdmin";
import ModifyAdmin from "../../components/modules/administrator/modules/adminitrators/ModifyAdmin";

import SeeCitas from "../../components/modules/administrator/modules/citas";
import ProgramarCita from "../../components/modules/administrator/modules/citas/ProgramarCita";
import VerCita from "../../components/modules/administrator/modules/citas/VerCita";

const AdminRoutes: RouteObject = {
  path: "/administrador",
  element: <TemplateAdministrator />,
  children: [
    { path: "crear_doctor", element: <CreateDoctor /> },
    { path: "modificar_doctor/:userId", element: <ModifyDoctor /> },
    { path: "ver_doctores", element: <SeeDoctor /> },

    { path: "crear_paciente", element: <CreatePatient /> },
    { path: "modificar_paciente/:userId", element: <ModifyPatient /> },
    { path: "ver_pacientes", element: <SeePatient /> },

    { path: "crear_administrador", element: <CreateAdmin /> },
    { path: "modificar_administrador/:userId", element: <ModifyAdmin /> },
    { path: "ver_administradores", element: <SeeAdmin /> },

    { path: "ver_citas", element: <SeeCitas /> },
    { path: "programar_cita/:citaId", element: <ProgramarCita /> },
    { path: "ver_cita/:citaId", element: <VerCita /> },
  ],
};

export default AdminRoutes;
