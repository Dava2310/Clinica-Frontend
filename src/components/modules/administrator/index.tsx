import { Outlet, useLocation } from 'react-router-dom'

const TemplateAdministrator = () => {

const location = useLocation();

    console.log(location.pathname)

  return (
    <>
     <div>
        <Outlet/>
     </div>
    </>
  )
}

export default TemplateAdministrator