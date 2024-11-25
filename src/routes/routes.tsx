import Login from "../components/modules/login";
import Citas from "../components/modules/doctors/modules/Citas"
import { getCookie } from "../utils/cookies";
import { nameCookieSessionApp } from "../config";
import Main from "../components/main/Main";
import ViewDoctors from "../components/modules/doctors/modules/ViewDoctors";
import EditDoctor from "../components/modules/doctors/modules/EditDoctor";
import TemplateDoctors from "../components/modules/doctors";

import { Navigate, useLocation } from "react-router-dom";
import TemplatePatients from "../components/modules/patients";
import EditPatients from "../components/modules/patients/modules/EditPatients";
import CreateCita from "../components/modules/patients/modules/CreateCita";

import { childrenTypeUsers, typeUsers } from "../config";

const tUser = "paciente";

// Componente que verifica el rol del usuario
const ProtectedRoute = ({ children, userRole }) => {

  const location = useLocation();

  //Verificamos si tiene token de acceso
  if(getCookie(nameCookieSessionApp) === undefined){
    return <Navigate to={"/login"}/>
  }

  //Extraemos el prefijo de urls que las que puede acceder el usuario con su rol asignado
  const correspondingModule = childrenTypeUsers.filter(e => e.type == userRole)[0];
  
  // Si no cumple con los requerimientos para acceder, se redirige al home del usuario correspondiente
 
  if (userRole === typeUsers.doctor && location.pathname.includes(correspondingModule.url)) {
    return children; // Permite acceso a rutas de doctores
  } else if (userRole === typeUsers.paciente && location.pathname.includes(correspondingModule.url)) {
    return children // Redirige a home si es paciente
  }

  return <Navigate to={correspondingModule.url}/>;
};


export const routes = [
  {
    loader: () => {
      // if(getCookie(nameCookieSessionApp) === undefined){
      //     throw {statusText: "Unauthenticated",  status: 401 };
      // }
  },
    path:'/',
    element:<Main/>,
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
              element:<Citas/>
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