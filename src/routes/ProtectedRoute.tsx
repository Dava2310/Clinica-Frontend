import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../utils/cookies";
import {
  nameCookieSessionApp,
  prefixUrlsTypeUsers,
  typeUsers,
} from "../config";
import { PropsToken } from "../types";

type PropsProtectedRoute = { children: ReactNode };

const isUserTypeMatchingPath = (
  pathname: string,
  userType: string
): boolean => {
  // Extraer la parte de la URL desde la raíz hasta el primer '/'
  const extractedPath = pathname.split("/")[1];

  // Comparar el string extraído con el tipo de usuario
  return extractedPath === userType;
};

// Componente que verifica el rol del usuario
const ProtectedRoute = ({ children }: PropsProtectedRoute) => {
  const location = useLocation();
  const token = getCookie(nameCookieSessionApp) as PropsToken;

  //Verificamos si tiene token de acceso
  if (token === undefined) {
    if (!location.pathname.includes("/login"))
      return <Navigate to={"/login"} />;
  }

  //Si tiene sesion activa e intenta redirigir al login redireccionamos al home de su respectivo modulo
  if (location.pathname.includes("/login")) {
    return <Navigate to={"/"} />;
  }

  //Extraemos el prefijo de urls que puede acceder el usuario con su rol asignado
  const correspondingModule = prefixUrlsTypeUsers.filter(
    (e) => e.type == token.tipoUsuario
  )[0];

  //Si tiene sesion activa e intenta redirigir al login redireccionamos al home de su respectivo modulo
  if (location.pathname.includes("/login")) {
    return <Navigate to={correspondingModule.url} />;
  }

  // Si no cumple con los requerimientos para acceder, se redirige al home del usuario correspondiente
  const result = isUserTypeMatchingPath(
    location.pathname,
    correspondingModule.type
  );

  if (result) return children;

  return <Navigate to={`/${correspondingModule.type}/`} />;
};

export default ProtectedRoute;
