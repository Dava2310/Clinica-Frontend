import { Outlet, useLocation } from 'react-router-dom'
import ViewCitas from './modules/ViewCitas';
import Main from '../../main/Main';

const TemplatePatients = () => {

const location = useLocation();

    console.log(location.pathname)

  return (
    <>
        <Main>
          {
              location.pathname.includes('quotes') ||
              location.pathname.includes('modify') ||
              location.pathname.includes('create_quotes')
              ?   
                  <Outlet/>
              :
                <ViewCitas/> 
          }
        </Main>
    </>
  )
}

export default TemplatePatients