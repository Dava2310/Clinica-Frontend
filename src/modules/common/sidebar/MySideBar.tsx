import { Sidebar } from "flowbite-react";
import {
  urlsDoctors,
  urlsPatients,
  urlsAdministrator,
  typeUsers,
  nameCookieSessionApp,
} from "../../../config";
import Item from "./Item";
import { getCookie } from "../../../utils/cookies";
import { PropsToken } from "../../../types";

export function MySideBar() {
  const data_user = getCookie(nameCookieSessionApp) as PropsToken;

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* Navegación para doctores */}
          {data_user.tipoUsuario === typeUsers.doctor &&
            urlsDoctors.map((e, i) => (
              <Item name={e.name} icon={e.icon} url={e.urls} key={i + 1} />
            ))}

          {/* Navegación para pacientes */}
          {data_user.tipoUsuario === typeUsers.paciente &&
            urlsPatients.map((e, i) => (
              <Item name={e.name} icon={e.icon} url={e.urls} key={i + 1} />
            ))}

          {/* Navegación para administradores */}
          {data_user.tipoUsuario === typeUsers.administrador &&
            urlsAdministrator.map((e, i) => (
              <Item name={e.name} icon={e.icon} url={e.urls} key={i + 1} />
            ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default MySideBar;
