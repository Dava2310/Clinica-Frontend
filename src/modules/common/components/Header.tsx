import { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

import { getCookie, deleteCookie } from "../../../utils/cookies";
import { nameCookieSessionApp } from "../../../config";
import { PropsToken } from "../../../types";
import client from "../../../api/client";

import Logo from "../../../assets/Logo.png";
import Cuenta from "../../../assets/cuenta.png";
import { ApiError } from "../interfaces/errorsApiInterface";

function Header() {
  //States
  const [token, setToken] = useState<PropsToken>();
  const navigate = useNavigate();
  const apiClient = client();

  const logout = async () => {
    try {
      const res = await apiClient.get("/api/auth/logout");
      if (res.status === 204) {
        //Eliminamos la cookie
        if (token) deleteCookie(nameCookieSessionApp);
        //Redireccionamos al login
        if (!getCookie(nameCookieSessionApp)) navigate("/login");
      }
    } catch (err) {
      const error = err as ApiError;

      //Redireccionamos por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  };

  //Effects
  useEffect(() => {
    setToken(getCookie(nameCookieSessionApp) as PropsToken);
  }, []);

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img className="w-10 h-10 mr-2" src={Logo} alt="logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Clinica Frontend
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img={Cuenta} rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {token?.nombre} {token?.apellido}
            </span>
            <span className="block truncate text-xs font-medium">
              {token?.email}
            </span>
          </Dropdown.Header>

          <Dropdown.Item onClick={logout}>Cerrar Sesión</Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}

export default Header;
