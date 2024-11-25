import { Outlet, useLocation } from 'react-router-dom'
import ViewDoctors from './modules/ViewDoctors';

const TemplateDoctors = () => {

const location = useLocation();

    console.log(location.pathname)

  return (
    <>
        {
            location.pathname.includes('citas_pendientes') ||
            location.pathname.includes('modify')
            ?   
                <Outlet/>
            :
            <   ViewDoctors/> 
       }
    </>
  )
}

export default TemplateDoctors