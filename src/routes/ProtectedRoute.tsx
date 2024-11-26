import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../utils/cookies";
import { nameCookieSessionApp, prefixUrlsTypeUsers, typeUsers } from "../config";

// Componente que verifica el rol del usuario
const ProtectedRoute = ({ children, userRole }) => {

  const location = useLocation();

  //Verificamos si tiene token de acceso
  if(getCookie(nameCookieSessionApp) === undefined){
    return <Navigate to={"/login"}/>
  }

  //Extraemos el prefijo de urls que puede acceder el usuario con su rol asignado
  const correspondingModule = prefixUrlsTypeUsers.filter(e => e.type == userRole)[0];

  //Si tiene sesion activa e intenta redirigir al login redireccionamos al home de su respectivo modulo
  if(location.pathname.includes('/login')){
    return <Navigate to={correspondingModule.url}/>;
  }
  
  // Si no cumple con los requerimientos para acceder, se redirige al home del usuario correspondiente
  if (userRole === typeUsers.doctor && location.pathname.includes(correspondingModule.url)) {
    return children; // Permite acceso a rutas de doctores
  } else if (userRole === typeUsers.paciente && location.pathname.includes(correspondingModule.url)) {
    return children // Redirige a home si es paciente
  }

  return <Navigate to={correspondingModule.url}/>;
};

export default ProtectedRoute;