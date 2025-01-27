import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import client from '../../../../api/client';
import { nameCookieSessionApp } from '../../../../config';
import { deleteCookie } from '../../../../utils/cookies';
import { formatDate } from '../../../../utils/utilidades';
import { toaster } from '../../../../utils/toaster';

interface Opciones {
  fecha:string,
  id:number,
  idCita:number,
  idDoctor:number
}

interface Doctor {
  id: number,
  especialidad: string,
  numeroTelefono: string,
  userId: number
  cedula: string,
  nombre: string,
  apellido: string,
  email: string,
  tipoUsuario:string 
}

interface Cita {
  especialidad:string,
  estado:string,
  tipoServicio:string,
  opciones:Opciones [],
  doctor:Doctor
}
interface PropsButton {
  fecha:string,
  id:number,
  setIdFechaSeleccionada : (id:number) => void
  idFechaSeleccionada:number|undefined
}

const Button = ({
  fecha,
  id,
  idFechaSeleccionada,
  setIdFechaSeleccionada
  } : PropsButton ) => {
  return (
    <button
      onClick={() => setIdFechaSeleccionada(id)}
      className={`w-fit h-32 flex items-center justify-center font-medium px-8 border-2  rounded-lg hover:cursor-pointer  ${idFechaSeleccionada == id ? 'border-4 border-white bg-gray-400 font-bold' : 'border-gray-300 bg-gray-100 hover:bg-gray-200 hover:border-gray-400'}`}>
          {
            fecha
          }
      </button>
  )
}

const AprobarCita = () => {
  
  //States
  const [cita, setCita] = useState<Cita>();
  const [idFechaSeleccionada, setIdFechaSeleccionada] = useState<number>();
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>();

  //Instances
  const params = useParams();
  const apiClient = client();
  const navigate = useNavigate();
  const {ToastContainer, messageToast} = toaster();

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

  const asignarIdFechaSeleccionada = (id:number|undefined) => {
    setIdFechaSeleccionada(id);
  }
  
  const aprobarCita = async () => {

    //Creamos un objeto date
    const dateObj = new Date(fechaSeleccionada as string);
    //Formateamos la fecha
    const newDate = formatDate(dateObj);

    const formData = new FormData();
    formData.append('idDoctor', `${cita?.opciones[0].idDoctor}`);
    formData.append('fecha', newDate);

    try {
      const res = await apiClient.patch(`/api/citas/aprobar/${params.citaId}`,formData);
      console.log(res)
      if(res.data.status == 200){
        messageToast({
          message:res.data.body.message,
          position:'bottom-right',
          theme:'colored',
          type:'success'
        });

        setTimeout(() => {navigate('/paciente/ver_citas')},2000)
      }

    } catch (error) {
      console.log(error)
      //Redireccionamos por no estar autenticado
      if(error?.response?.data.statusCode === 401){
        deleteCookie(nameCookieSessionApp);
        navigate('/login');
      }
    }
  }

  //Effects
  useEffect(() => {
    const fetch = async () => {
      await fetchCita();
    }

    fetch();
  },[])

  useEffect(() => {

    if(idFechaSeleccionada !== undefined){
      const f = cita?.opciones.filter( c => c.id === idFechaSeleccionada) as Opciones[];
      setFechaSeleccionada(f[0].fecha as string);
    }

  },[idFechaSeleccionada])


  return (
    <div className='w-full h-full flex flex-col gap-y-4 p-4'>
      <h1 className='text-center font-medium'>Aprobar Cita</h1>
      <div className='w-2/4 flex flex-col items-center gap-y-2 px-4 mx-auto bg-gray-50 p-4 border-2 border-gray-200 rounded-md'>

          {/* Datos del doctor */}
          <div className='sm:w-full lg:w-3/4 lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="doctor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doctor Seleccionado:</label>
            <input 
              type="text"
              placeholder=''
              value = { `${cita?.doctor ? `${cita?.doctor.nombre} ${cita?.doctor.apellido}`  : ''}` }    
              className="bg-gray-50 border text-center font-medium border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            />
          </div>

          {/* Seleccion de fechas */}
          <h2 className='font-medium'>Seleccione una fecha:</h2>
          <div className='flex gap-x-2 w-fit'>
            {
              cita && 
                cita.opciones.map(c => {
                  return <Button 
                            key={c.id as number}
                            id={c.id}
                            fecha={formatFecha(c.fecha)}
                            idFechaSeleccionada={idFechaSeleccionada}
                            setIdFechaSeleccionada={asignarIdFechaSeleccionada}
                          />
                })
            }
          </div>
      </div>
      {/* Container Button */}
      <div className='w-full flex justify-center mt-2'>
          <button
            disabled = {idFechaSeleccionada === undefined }
            onClick={aprobarCita}
            type="button"
            className="w-[25%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Aprobar cita
          </button>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default AprobarCita