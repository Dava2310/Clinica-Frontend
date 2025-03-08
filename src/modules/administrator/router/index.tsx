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
import AppointmentsPage from "../pages/AppointmentsPage";
import CreateAppointmentPage from "../pages/CreateAppointmentPage";
import AppointmentPage from "../pages/AppointmentPage";

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

    { path: "ver_citas", element: <AppointmentsPage /> },
    { path: "programar_cita/:citaId", element: <CreateAppointmentPage /> },
    { path: "ver_cita/:citaId", element: <AppointmentPage /> },
  ],
};

export default AdminRoutes;
