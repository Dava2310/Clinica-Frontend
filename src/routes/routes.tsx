import Login from "../components/modules/login";
import Main from "../components/main/Main";
import ProtectedRoute from "./ProtectedRoute";
import TemplateAdministrator from "../components/modules/administrator";


import ProtectedLogin from "./ProtectedLogin";
import CreateDoctor from "../components/modules/administrator/modules/doctors/CreateDoctor";
import ModifyDoctor from "../components/modules/administrator/modules/doctors/ModifyDoctor";
import SeeDoctor from "../components/modules/administrator/modules/doctors/SeeDoctor";

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
          {
            path:"crear_doctor", 
            element:<CreateDoctor/>
          },
          {
            path:"modificar_doctor/:id",
            element:<ModifyDoctor/>
          },
          {
            path:"ver_doctores",
            element:<SeeDoctor/>
          },
        ]
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