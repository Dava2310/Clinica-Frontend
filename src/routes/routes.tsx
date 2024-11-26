import Login from "../components/modules/login";
import Citas from "../components/modules/doctors/modules/Citas"
import Main from "../components/main/Main";
import ViewDoctors from "../components/modules/doctors/modules/ViewDoctors";
import EditDoctor from "../components/modules/doctors/modules/EditDoctor";
import TemplateDoctors from "../components/modules/doctors";
import TemplatePatients from "../components/modules/patients";
import EditPatients from "../components/modules/patients/modules/EditPatients";
import CreateCita from "../components/modules/patients/modules/CreateCita";
import ProtectedRoute from "./ProtectedRoute";

const tUser = "paciente";

export const routes = [
  {
    path:'/',
    element:(
      <ProtectedRoute userRole={tUser}>
        <Main />
      </ProtectedRoute>
    ),
    errorElement:'Ha ocurrido un error',
    children: [
      {
        path:'/doctors/',
        element:(
          <ProtectedRoute userRole={tUser}>
            <TemplateDoctors />
          </ProtectedRoute>
        ),
        children : [
          {
              path:"citas_pendientes",
          },
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
          <ProtectedRoute userRole={tUser}>
            <TemplatePatients />
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
        ]
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
];