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
import CreateCita from "../components/modules/patients/modules/CreateCita";
import ViewCitas from "../components/modules/patients/modules/ViewCitas";
import CreateCitas from "../components/modules/patients/modules/CreateCitas";
import SeeCitas from "../components/modules/administrator/modules/citas";
import ProgramarCita from "../components/modules/administrator/modules/citas/ProgramarCita";
import AprobarCita from "../components/modules/patients/modules/AprobarCita";
import VerCita from "../components/modules/administrator/modules/citas/VerCita";
import TemplateDoctors from "../components/modules/doctors";

const routes = [
  {   
    path: "/",
    element:(<ProtectedRoute><Main/></ProtectedRoute>),
    errorElement:"Ha ocurrido un error",
    children:[
      {
        path:'/administrador/',
        element:<TemplateAdministrator/>,
        children:[
          // Doctores
          {
            path:"crear_doctor", 
            element:<CreateDoctor/>
          },
          {
            path:"modificar_doctor/:userId",
            element:<ModifyDoctor/>
          },
          {
            path:"ver_doctores",
            element:<SeeDoctor/>
          },
          //Pacientes
          {
            path:"crear_paciente", 
            element:<CreatePatient/>
          },
          {
            path:"modificar_paciente/:userId",
            element:<ModifyPatient/>
          },
          {
            path:"ver_pacientes",
            element:<SeePatient/>
          },
          //Administradores
          {
            path:"crear_administrador", 
            element:<CreateAdmin/>
          },
          {
            path:"modificar_administrador/:userId",
            element:<ModifyAdmin/>
          },
          {
            path:"ver_administradores",
            element:<SeeAdmin/>
          },
          //Citas
          {
            path:"ver_citas",
            element:<SeeCitas/>
          },
          {
            path:"programar_cita/:citaId",
            element:<ProgramarCita/>
          },
          {
            path:"ver_cita/:citaId",
            element:<VerCita/>
          }
        ]
      },
      {
        path:'/paciente/',
        element:<TemplatePatients/>,
        children:[
          {
            path:"solicitar_cita",
            element:<CreateCitas/>
          },
          {
            path:"ver_citas",
            element:<ViewCitas/>
          },
          {
            path:"aprobar_cita/:citaId",
            element:<AprobarCita/>
          },
        ]
      },
      {
        path:'/doctor/',
        element:<TemplateDoctors/>
      }
    ]
  },
  {
    path:'/login',
    element:(
      <ProtectedLogin><Login/></ProtectedLogin>
    )
  },
]

export default routes







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