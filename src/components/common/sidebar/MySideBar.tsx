import { Sidebar } from "flowbite-react";
import { urlsDoctors, urlsPatients } from "../../../config";
import ItemCollapse from "./ItemCollapse";
import Item from "./Item";

export function MySideBar() {
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {
            
            urlsDoctors.map((e,i) => {
                return e.urls.length > 1 
                ?
                  <ItemCollapse label={e.name} icon={e.icon} urls={e.urls} key={i+1}/>
                :
                  <Item name={e.name} icon={e.icon} url={e.urls} key={i+1}/>
            })

            
          }

          {
            
            urlsPatients.map((e,i) => {
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