import { Outlet, useLocation } from 'react-router-dom'
import ViewDoctors from './modules/ViewDoctors';
import Main from '../../main/Main';

const TemplateDoctors = () => {

const location = useLocation();

    console.log(location.pathname)

  return (
    <>
        <Main>
          {
              location.pathname.includes('citas_pendientes') ||
              location.pathname.includes('modify')
              ?   
                  <Outlet/>
              :
              <   ViewDoctors/> 
          }
        </Main>
    </>
  )
}

export default TemplateDoctors