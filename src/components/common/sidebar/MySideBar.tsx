import { Sidebar } from "flowbite-react";
import { urlsDoctors, urlsPatients, urlsAdministrator, typeUsers, nameCookieSessionApp } from "../../../config";
import ItemCollapse from "./ItemCollapse";
import Item from "./Item";
import { getCookie } from "../../../utils/cookies";
import { PropsToken } from "../../../types";

export function MySideBar() {

  const data_user:PropsToken = getCookie(nameCookieSessionApp);

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>

          {/* Navegacion para doctores */}
          {
            
            data_user.tipoUsuario === typeUsers.doctor &&
            
            urlsDoctors.map((e,i) => {
                return e.urls.length > 1 
                ?
                  <ItemCollapse label={e.name} icon={e.icon} urls={e.urls} key={i+1}/>
                :
                  <Item name={e.name} icon={e.icon} url={e.urls} key={i+1}/>
            })

            
          }

          {/* Navegacion para pacientes */}
          {
            data_user.tipoUsuario === typeUsers.paciente &&
            urlsPatients.map((e,i) => {
                return e.urls.length > 1 
                ?
                  <ItemCollapse label={e.name} icon={e.icon} urls={e.urls} key={i+2}/>
                :
                  <Item name={e.name} icon={e.icon} url={e.urls} key={i+2}/>
            })
          }

          {/* Navegacion para administradores */}
          {
            data_user.tipoUsuario === typeUsers.administrador &&
            urlsAdministrator.map((e,i) => {
                return e.urls.length > 1 
                ?
                  <ItemCollapse label={e.name} icon={e.icon} urls={e.urls} key={i+2}/>
                :
                  <Item name={e.name} icon={e.icon} url={e.urls} key={i+2}/>
            })
          }
        </Sidebar.ItemGroup> 
      </Sidebar.Items>
    </Sidebar>
  );
}

export default MySideBar