import { RouteObject } from "react-router-dom";
import TemplateAdministrator from "../";
import CreateDoctorPage from "../pages/CreateDoctorPage";
import UpdateDoctor from "../pages/UpdateDoctorPage";
import DoctorPage from "../pages/DoctorPage";
import CreatePatientPage from "../pages/CreatePatientPage";
import UpdatePatientPage from "../pages/UpdatePatientPage";
import PatientPage from "../pages/PatientPage";
import CreateAdminPage from "../pages/CreateAdminPage";
import UpdateAdminPage from "../pages/UpdateAdminPage";
import AdminPage from "../pages/AdminPage";

const AdminRoutes: RouteObject = {
  path: "/administrador",
  element: <TemplateAdministrator />,
  children: [
    { path: "crear_doctor", element: <CreateDoctorPage /> },
    { path: "modificar_doctor/:userId", element: <UpdateDoctor /> },
    { path: "ver_doctores", element: <DoctorPage /> },

    { path: "crear_paciente", element: <CreatePatientPage /> },
    { path: "modificar_paciente/:userId", element: <UpdatePatientPage /> },
    { path: "ver_pacientes", element: <PatientPage /> },

    { path: "crear_administrador", element: <CreateAdminPage /> },
    { path: "modificar_administrador/:userId", element: <UpdateAdminPage /> },
    { path: "ver_administradores", element: <AdminPage /> },

    // { path: "ver_citas", element: <SeeCitas /> },
    // { path: "programar_cita/:citaId", element: <ProgramarCita /> },
    // { path: "ver_cita/:citaId", element: <VerCita /> },
  ],
};

export default AdminRoutes;
