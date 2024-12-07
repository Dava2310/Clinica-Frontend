import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { arrEspecialidades } from '../../../../config'
import { useNavigate } from 'react-router-dom'
import client from '../../../../api/client'
import { Panel, PropsToaster } from '../../../../types'

type Doctor = {
  id:number,
  userId:number,
  nombre:string,
  apellido:string,
  cedula:string,
  email:string,
  especialidad:string,
  numeroTelefono:string
}

type PropsSeleccionarDoctor = {
  onSelectedPanel: (p: Panel) => void,
  messageToast: (p:PropsToaster) => void,
  panel:Panel
}

const SeleccionarDoctor = ({
  onSelectedPanel,
  messageToast,
  panel
}:PropsSeleccionarDoctor) => {

  // States
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [especialidad, setEspecialidad] = useState<string>("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();
  const apiClient = client();

  const selectedPanel = () => {
    
    if(panel === 1){
      messageToast({
        message:"¡Paso 1 completado!",
        position:'bottom-right',
        theme:'colored',
        type:'success',
        autoClose:1000
      });
    }

    //Cambiamos el panel
    setTimeout(() => {
      onSelectedPanel(2)
    }, 1500);
  };

  const onSelectedEspecialidad = (e) => {
    const param = e.target.value;

    if(param !== ""){
      let filter = doctors.filter(doctor => {
        return doctor.especialidad.toLowerCase().includes(param.toLowerCase());
      })

      console.log(filter)
      setEspecialidad(param);

      setFilteredDoctors(filter);
    }
  };

  const filterDoctors = (e) => {
    const param = e.target.value;

    let filter = [] as Doctor[];

    if(especialidad !== ""){
      filter = doctors.filter(doctor => {
        return doctor.especialidad.toLowerCase().includes(especialidad.toLowerCase());
      })
    }

    filter = doctors.filter((doctor) => {
      const doc = `${doctor.nombre} ${doctor.apellido}`;
      return doc.
        toLowerCase()
        .split(' ')
        .join('')
        .includes(param.toLowerCase().split(' ').join(''))
    });

    if(e.target.value === "") filter = [];
    
    setFilteredDoctors(filter)
  }

  const fetchDoctors = async () => {
    try {
      const res = await apiClient.get('/api/doctores/');
      if(res.status === 200){
        setDoctors(res.data.body.data)
      }
      
    } catch (error) {
      //Redireccionamos por no estar autenticado
      if(error?.response?.data.statusCode === 401){
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    const fetch = async() => {
      await fetchDoctors();
    }
    fetch();
  },[]);

  return (
    <>
       {/* Contenedor Button y buscador */}
     <div className='w-full flex justify-between items-center gap-x-4 border-2 border-gray-300 rounded-md p-2 bg-gray-50'>
        
        {/* tipo de sangre */}
        <div className='sm:w-full lg:w-[45%]'>
            <label htmlFor="tipoSangre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Especialidad</label>
            <select
              onChange={onSelectedEspecialidad}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            >
              <option value="">Seleccione una especialidad:</option>
              {
                arrEspecialidades.map(t => {
                  return <option value={t.type}>{t.type}</option>
                })
              }
            </select>
        </div>
       
        
        {/* Buscador */}
        <div className='sm:w-full lg:w-[30%]'>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filtrar por nombre:</label>
          <input 
            type="text"
           onChange={filterDoctors}
            placeholder='Ingresa un nombre'    
            className="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"    
          />         
        </div>
      </div>
   
      {/* Contendor table */}
      <div className="overflow-x-auto w-full max-h-full flex  justify-center border-2 bg-gray-50 border-gray-300 rounded-md py-2">
      <Table hoverable className='w-full'>
          
          <Table.Head className='w-full'>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Cédula</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Especialidad</Table.HeadCell>
            <Table.HeadCell>Teléfono</Table.HeadCell>
          </Table.Head>
      
          <Table.Body className="divide-y">
            {
              filteredDoctors.length > 0
                ?
                  filteredDoctors.map(e => {
                    return <Table.Row key={e.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {e.nombre} {e.apellido}
                      </Table.Cell>
                      <Table.Cell>{e.cedula}</Table.Cell>
                      <Table.Cell>{e.email}</Table.Cell>
                      <Table.Cell>{e.especialidad}</Table.Cell>
                      <Table.Cell>{e.numeroTelefono}</Table.Cell>
                      
                    </Table.Row>
                  })
                :
                  doctors.map(e => {
                    return <Table.Row key={e.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {e.nombre} {e.apellido}
                      </Table.Cell>
                      <Table.Cell>{e.cedula}</Table.Cell>
                      <Table.Cell>{e.email}</Table.Cell>
                      <Table.Cell>{e.especialidad}</Table.Cell>
                      <Table.Cell>{e.numeroTelefono}</Table.Cell>
                    </Table.Row>
                  })
            }
          </Table.Body>
        </Table>
      </div>

       {/* Container Button */}
       <div className='w-full flex justify-center mt-2'>
          <button 
            type="button"
            onClick={selectedPanel} 
            className="w-[25%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Continuar
          </button>
      </div>
    </>
  )
}

export default SeleccionarDoctor