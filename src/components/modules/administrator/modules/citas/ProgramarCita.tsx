import React, { useEffect, useState } from 'react'
import SeleccionarDoctor from './SeleccionarDoctor';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../../../../api/client';
import { nameCookieSessionApp } from '../../../../../config';
import { deleteCookie } from '../../../../../utils/cookies';
import { toaster } from '../../../../../utils/toaster';


const ProgramarCita = () => {

    //States
    const [cantidadFecha, setCantidaFecha] = useState<number>(1);
    const [fechas, setFechas] = useState<string []>([]);
    const [doctorSelected, setDoctorSelected] = useState<number>();

    //Instances
    const navigate = useNavigate();
    const apiClient = client();
    const params = useParams();
    const {ToastContainer, messageToast} = toaster();

    //Functions
    const handleSetCantidadFechas = (e) => setCantidaFecha(Number(e.target.value));
    const setDoctor = (e:number) => setDoctorSelected(e);
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const milliseconds = String(date.getMilliseconds()).padStart(3, '0'); // Milisegundos
  
      // Formato ISO-8601: YYYY-MM-DDTHH:mm:ss.SSS
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    };
    
    const seleccionarFecha = (e) => {
      e.preventDefault();

      //Verificamos que se haya seleccionado una fecha
      if(e.target.fecha.value === "") return;

      if(fechas.length >= cantidadFecha) return;

      const dateObj = new Date(e.target.fecha.value);
      const newDate = formatDate(dateObj);

      setFechas([...fechas, newDate])
    };
    
    const onSubmit = async () => {

      const opciones = [];
       
        fechas.forEach(f => {
          opciones.push( {
            idCita: Number(params.citaId),
            fecha: f,
            idDoctor: doctorSelected
          })
        });
 
        try {
          const res = await apiClient.post('/api/citas/opciones/', opciones);
          console.log(res)
          if(res.status === 201){
            messageToast({
              message:res.data.body.message,
              position:'bottom-right',
              theme:'colored',
              type:'success'
            });
          }
          
        } catch (error) {
          console.log(error)
          //Redireccionamos por no estar autenticado
          if(error?.response?.data.statusCode === 401){
            deleteCookie(nameCookieSessionApp);
            navigate('/login');
          }
        }
    };

    useEffect(() => {
        if(cantidadFecha < fechas.length){
          const copyFechas = [...fechas];
          copyFechas.pop();
          setFechas(copyFechas);
        }
    },[cantidadFecha])

  return (
    <div className='w-full h-full flex flex-col gap-y-4 p-4'>
      
      {/* Contenedor Button y buscador */}
      <div className='w-full flex justify-between items-center gap-x-4 border-2 border-gray-300 rounded-md p-2 bg-gray-50'>
         
        {/* Buscador */}
        <form action="" className='w-2/4'>
          <div className='sm:w-full lg:w-1/4'>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad fechas:</label>
            <input 
              type="number"
              min={1}
              max={3}
              value={cantidadFecha}
              onChange={handleSetCantidadFechas}
              placeholder=''    
              className="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"    
            />         
          </div>
        </form>

        <div>
          <form action="" onSubmit={seleccionarFecha} className='flex gap-x-2'>
            <input 
              type="datetime-local"
              id='fecha' 
            />
            <button 
              className="w-fit text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type='submit'>Seleccionar</button>
          </form>
        </div>
      </div>

      {/* Fechas Seleccionadas */}
      <div className='w-fit flex justify-between items-center gap-x-4 border-2 border-gray-300 rounded-md bg-gray-50'>
        <h2 className='font-medium p-2'>Fechas seleccionadas:</h2>
        {
          fechas.length > 0 &&
            fechas.map((f,i) => {
              return <div key={i} className='border-r-2 border-gary-300 p-2'>{f}</div>
            })
        }
      </div>

      <SeleccionarDoctor
         setDoctor={setDoctor}
         doctor={doctorSelected} 
      />

      {/* Container Button */}
      <div className='w-full flex justify-center mt-2'>
          <button
            disabled = {doctorSelected === undefined || fechas.length < cantidadFecha}
            type="button"
            onClick={onSubmit}
            className="w-[25%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Programar cita
          </button>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ProgramarCita