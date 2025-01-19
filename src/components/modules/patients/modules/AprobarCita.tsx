import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import client from '../../../../api/client';
import { nameCookieSessionApp } from '../../../../config';
import { deleteCookie } from '../../../../utils/cookies';

const AprobarCita = () => {
  
  //States
  const [cita, setCita] = useState();
  const [fechaSelected, setFechaSelected] = useState<string>('');

  //Instances
  const params = useParams();
  const apiClient = client();
  const navigate = useNavigate();

  //Funtions
  const formatFecha = (date:string) => {
    // Convertir la cadena a un objeto Date
    const fecha = new Date(date);

    // Formatear la fecha para obtener solo el año, mes y día
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
    const day = String(fecha.getDate()).padStart(2, '0');

    // Combinar en formato 'YYYY-MM-DD'
    return `${year}-${month}-${day}`;
  }

  const fetchCita = async () => {
    try {
      const res = await apiClient.get(`/api/citas/opciones/${params.citaId}`);
      console.log(res)
      if(res.status === 200){
        setCita(res.data.body.data)
      }
      
    } catch (error) {
      console.log(error)
      //Redireccionamos por no estar autenticado
      if(error?.response?.data.statusCode === 401){
        deleteCookie(nameCookieSessionApp);
        navigate('/login');
      }

      if(error?.response?.status == 404){
        //
      }
    }
  }

  const asignarFecha = (id) => {
    setFechaSelected(id);
  } 

  //Effects
  useEffect(() => {
    const fetch = async () => {
      await fetchCita();
    }

    fetch();
  },[])


  return (
    <div className='w-full h-full flex flex-col gap-y-4 p-4'>

       <div className='flex flex-col px-4'>
          <h1 className='font-medium'>Seleccione una fecha:</h1>
          <div className='flex gap-x-2 w-fit'>
            <button
              onClick={() => asignarFecha('1')} 
              className={`w-fit h-32 flex items-center justify-center font-medium px-2 border-2 border-gray-300 bg-gray-100 rounded-lg hover:cursor-pointer hover:bg-gray-200 hover:border-gray-400 ${fechaSelected == '1' ? 'border-2 border-blue-500' : ''}`}>
                  {
                    cita && formatFecha(cita.opciones[0].fecha)
                  }
              </button>

              <button
              onClick={() => asignarFecha('2')} 
              className={`w-fit h-32 flex items-center justify-center font-medium px-2 border-2 border-gray-300 bg-gray-100 rounded-lg hover:cursor-pointer hover:bg-gray-200 hover:border-gray-400 ${fechaSelected == '2' ? 'border-2 border-blue-500' : ''}`}>
                  {
                    cita && formatFecha(cita.opciones[0].fecha)
                  }
              </button>

              <button
              onClick={() => asignarFecha('3')} 
              className={`w-fit h-32 flex items-center justify-center font-medium px-2 border-2 border-gray-300 bg-gray-100 rounded-lg hover:cursor-pointer hover:bg-gray-200 hover:border-gray-400 ${fechaSelected == '3' ? 'border-2 border-blue-500' : ''}`}>
                  {
                    cita && formatFecha(cita.opciones[0].fecha)
                  }
              </button>
        </div>
       </div>

      

    </div>
  )
}

export default AprobarCita