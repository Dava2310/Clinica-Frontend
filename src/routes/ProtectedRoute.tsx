import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../utils/cookies";
import { nameCookieSessionApp, prefixUrlsTypeUsers, typeUsers } from "../config";
import { PropsToken } from "../types";

type PropsProtectedRoute = { children: ReactNode }

// Componente que verifica el rol del usuario
const ProtectedRoute = ({ children } : PropsProtectedRoute) => {

  const location = useLocation();
  const token:PropsToken = getCookie(nameCookieSessionApp);

  //Verificamos si tiene token de acceso
  if(token === undefined){
    if(!location.pathname.includes('/login')) return <Navigate to={"/login"}/> 
  }

  //Si tiene sesion activa e intenta redirigir al login redireccionamos al home de su respectivo modulo
  if(location.pathname.includes('/login')){
    return <Navigate to={'/'}/>;
  }

  //Extraemos el prefijo de urls que puede acceder el usuario con su rol asignado
  const correspondingModule = prefixUrlsTypeUsers.filter(e => e.type == token.tipoUsuario)[0];

  //Si tiene sesion activa e intenta redirigir al login redireccionamos al home de su respectivo modulo
  if(location.pathname.includes('/login')){
    return <Navigate to={correspondingModule.url}/>;
  }
  
 // Si no cumple con los requerimientos para acceder, se redirige al home del usuario correspondiente
  if (token.tipoUsuario === typeUsers.doctor && location.pathname.includes(correspondingModule.url)) {
    return children; // Permite acceso a rutas de doctores
  } else if (token.tipoUsuario === typeUsers.paciente && location.pathname.includes(correspondingModule.url)) {
    return children // Redirige a home si es paciente
  } else if (token.tipoUsuario === typeUsers.administrador && location.pathname.includes(correspondingModule.url)) {
    return children // Redirige a home si es paciente
  }

  return <Navigate to={correspondingModule.url}/>;
};

export default ProtectedRoute;


 