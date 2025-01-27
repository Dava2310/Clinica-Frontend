import Login from "../components/modules/login";
import Main from "../components/main/Main";
import ProtectedRoute from "./ProtectedRoute";
import TemplateAdministrator from "../components/modules/administrator";

import ProtectedLogin from "./ProtectedLogin";
import CreateDoctor from "../components/modules/administrator/modules/doctors/CreateDoctor";
import ModifyDoctor from "../components/modules/administrator/modules/doctors/ModifyDoctor";
import SeeDoctor from "../components/modules/administrator/modules/doctors/SeeDoctor";
import CreatePatient from "../components/modules/administrator/modules/patients/CreatePatient";
import ModifyPatient from "../components/modules/administrator/modules/patients/ModifyPatient";
import SeePatient from "../components/modules/administrator/modules/patients/SeePatient";
import SeeAdmin from "../components/modules/administrator/modules/adminitrators/SeeAdmin";
import CreateAdmin from "../components/modules/administrator/modules/adminitrators/CreateAdmin";
import ModifyAdmin from "../components/modules/administrator/modules/adminitrators/ModifyAdmin";
import TemplatePatients from "../components/modules/patients";
import ViewCitas from "../components/modules/patients/modules/ViewCitas";
import CreateCitas from "../components/modules/patients/modules/CreateCitas";
import SeeCitas from "../components/modules/administrator/modules/citas";
import ProgramarCita from "../components/modules/administrator/modules/citas/ProgramarCita";
import AprobarCita from "../components/modules/patients/modules/AprobarCita";
import VerCita from "../components/modules/administrator/modules/citas/VerCita";
import TemplateDoctors from "../components/modules/doctors";
import Citas from "../components/modules/doctors/modules/Citas";
import FinalizarCita from "../components/modules/doctors/modules/FinalizarCita";
import ResumenesMedicos from "../components/modules/doctors/modules/ResumenesMedicos";
import ListadoResumenes from "../components/modules/doctors/modules/ListadoResumenes";
import VerResumen from "../components/modules/doctors/modules/VerResumen";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
    errorElement: "Ha ocurrido un error",
    children: [
      {
        path: "/administrador/",
        element: <TemplateAdministrator />,
        children: [
          // Doctores
          {
            path: "crear_doctor",
            element: <CreateDoctor />,
          },
          {
            path: "modificar_doctor/:userId",
            element: <ModifyDoctor />,
          },
          {
            path: "ver_doctores",
            element: <SeeDoctor />,
          },
          //Pacientes
          {
            path: "crear_paciente",
            element: <CreatePatient />,
          },
          {
            path: "modificar_paciente/:userId",
            element: <ModifyPatient />,
          },
          {
            path: "ver_pacientes",
            element: <SeePatient />,
          },
          //Administradores
          {
            path: "crear_administrador",
            element: <CreateAdmin />,
          },
          {
            path: "modificar_administrador/:userId",
            element: <ModifyAdmin />,
          },
          {
            path: "ver_administradores",
            element: <SeeAdmin />,
          },
          //Citas
          {
            path: "ver_citas",
            element: <SeeCitas />,
          },
          {
            path: "programar_cita/:citaId",
            element: <ProgramarCita />,
          },
          {
            path: "ver_cita/:citaId",
            element: <VerCita />,
          },
        ],
      },
      {
        path: "/paciente/",
        element: <TemplatePatients />,
        children: [
          {
            path: "solicitar_cita",
            element: <CreateCitas />,
          },
          {
            path: "ver_citas",
            element: <ViewCitas />,
          },
          {
            path: "aprobar_cita/:citaId",
            element: <AprobarCita />,
          },
          {
            path: "ver_cita/:citaId",
            element: <VerCita />,
          },
        ],
      },
      {
        path: "/doctor/",
        element: <TemplateDoctors />,
        children: [
          {
            path: "ver_citas",
            element: <Citas />,
          },
          {
            path: "finalizar_cita/:citaId",
            element: <FinalizarCita />,
          },
          {
            path: "ver_resumenes",
            element: <ResumenesMedicos />,
          },
          {
            path: "listado_resumenes/:resumenId",
            element: <ListadoResumenes />,
          },
          {
            path: "ver_resumen/:resumenId",
            element: <VerResumen />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ProtectedLogin>
        <Login />
      </ProtectedLogin>
    ),
  },
];

export default routes;

/*  path:'/doctors/',
        element:(
          <ProtectedRoute>
            <TemplateDoctors />
          </ProtectedRoute>
        ),
        children : [
          // {
          //     path:"citas_pendientes",
          // },
          {
            path:"modify",
            element:<EditDoctor/>
          },
          {
            path:"view",
            element:<ViewDoctors/>
          }
        ]
      },
      {
        path:'/patients/',
        element:(
          <ProtectedRoute>
            <TemplatePatients />
          </ProtectedRoute>
        ),
        children:[
          {
            path:"quotes", 
            element:<TemplatePatients />
          },
          {
            path:"modify",
            element:<EditPatients/>
          },
          {
            path:"create_quotes",
            element:<CreateCita/>
          }
        ]
      },
      {
        path:'/administrator/',
        element:(
          <ProtectedRoute>
            <TemplateAdministrator />
          </ProtectedRoute>
        ),
        children:[
          {
            path:"quotes", 
            element:<Citas/>
          },
          {
            path:"modify",
            element:<EditPatients/>
          },
          {
            path:"create_quotes",
            element:<CreateCita/>
          }
        ]*/
