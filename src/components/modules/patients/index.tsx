import { Outlet, useLocation } from 'react-router-dom'
import ViewCitas from './modules/ViewCitas';

const TemplatePatients = () => {

const location = useLocation();

    console.log(location.pathname)

  return (
    <>
        {
            location.pathname.includes('quotes') ||
            location.pathname.includes('modify') ||
            location.pathname.includes('create_quotes')
            ?   
                <Outlet/>
            :
              <ViewCitas/> 
       }
    </>
  )
}

export default TemplatePatients