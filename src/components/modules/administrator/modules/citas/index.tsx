import React, { useEffect, useState } from 'react'
import MyModal from '../../../../common/alert/Modal';
import TableCitasProgramadas from './TableCitasProgramadas';
import TableCitasSolicitadas from './TableCitasSolicitadas';
import { Citas } from '../../../patients/modules/ViewCitas';
import { useNavigate } from 'react-router-dom';
import client from '../../../../../api/client';
import { toaster } from '../../../../../utils/toaster';
import Tabs from '../../../../common/tabs';
import { nameCookieSessionApp } from '../../../../../config';
import { deleteCookie } from '../../../../../utils/cookies';
import TableCitasEnProceso from './TableCitasEnProceso';

const SeeCitas = () => {
  //States
  const [citas, setCitas] = useState<Citas []>([]);
  const [filteredCitas, setFilteredCitas] = useState<Citas []>([]);
  const [panel,setPanel] = useState<number>(1);
  const [citaABorrar, setCitaABorrar] = useState<number>()
  const [openModal, setOpenModal] = useState(false);
  //Intances
  const navigate = useNavigate();
  const apiClient = client();
  const {ToastContainer, messageToast} = toaster();

  const togglePanel = (p:number) => {
    setPanel(p)
  }

  const modalOpen = (e:number) => {
    //Seteamos el doctor a borrar
    setCitaABorrar(e);
    //Abrimos el modal
    setOpenModal(true)
  };

  const closeModal = () => {
    //Limpiamos el estado del doctor a borrar
    setCitaABorrar(undefined)
    //Cerramos el modal
    setOpenModal(false)
  };

  const filterCitas = () => {
    
    if(panel === 1){
        const c = citas.filter(e => e.estado === 'Solicitada');
        setFilteredCitas(c);
    }

    if(panel === 2){
      const c = citas.filter(e => e.estado === 'Opciones');
        setFilteredCitas(c);
    }

    if(panel === 3){
      const c = citas.filter(e => e.estado === 'Programada');
        setFilteredCitas(c);
    }
  }

  const deleteCita = async() => {
    try {
      const res = await apiClient.get(`/api/citas/cancelar/${citaABorrar}`);
      if(res.status === 200){
        messageToast({
          message:res.data.body.message,
          position:'bottom-right',
          theme:'colored',
          type:'success'
        });

        //Eliminamos el doctor borrado del estado
        const d = citas.filter(e => e.id !== citaABorrar);
        setCitas(d)
        //Limpiamos el estado del doctor a borrar
        setCitaABorrar(undefined)
        closeModal();
      }
      
    } catch (error) {
      //Redireccionamos por no estar autenticado
      if(error?.response?.data.statusCode === 401){
        deleteCookie(nameCookieSessionApp);
        navigate('/login');
      }
    }
  };


  const fetchCitas = async () => {
    try {
      const res = await apiClient.get('/api/citas/');
      if(res.status === 200){
        if(res.data.body.data.length === 0){
          messageToast({
            message:res.data.body.message,
            position:'bottom-right',
            theme:'colored',
            type:'info'
          });
        }
        setCitas(res.data.body.data)
      }
      
    } catch (error) {
      console.log(error)
      //Redireccionamos por no estar autenticado
      if(error?.response?.data.statusCode === 401){
        deleteCookie(nameCookieSessionApp);
        navigate('/login');
      }

      if(error?.response?.status == 404){
        navigate('/error');
      }
    }
  }

  useEffect(() => {
    const fetch = async() => {
      await fetchCitas();
    }

    fetch();
  },[]);

  useEffect(() => {
    filterCitas();
  },[panel,citas]);

  return (
    <>
      <Tabs 
        panel={panel}
        setPanel={togglePanel}
      />

      <div className='w-full h-full flex flex-col gap-y-4 p-4'>
        <div className='bg-gray-50 rounded-md'>
          {
            panel === 1
              &&
              <TableCitasSolicitadas 
                filteredCitas={filteredCitas} 
                modalOpen={modalOpen}
              />
          }

          {
             panel === 2 &&
             <TableCitasEnProceso 
               filteredCitas={filteredCitas} 
               modalOpen={modalOpen}
             />
          }

          {
             panel === 3 &&
             <TableCitasProgramadas
               filteredCitas={filteredCitas} 
               modalOpen={modalOpen}
             />
          }

          <MyModal 
            closeModal={closeModal} 
            deleteUser={deleteCita} 
            openModal={openModal} 
            title='¿Está seguro de cancelar la cita?' 
            textButton='Cancelar'
          />
        </div>
        <ToastContainer/>
      </div>
    </>
  )
}

export default SeeCitas