import React, { useEffect, useState } from 'react'
import { toaster } from '../../../../utils/toaster';
import client from '../../../../api/client';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';

type PropsTabs = {
  panel:number,
  setPanel: (panel: number) => void
}

const Tabs = ({panel, setPanel}:PropsTabs) => {

  const onHandleclick = (p:number) => setPanel(p);
  return (
    <div className='w-full'>
      <div className='w-fit border-2 border-gray-200 bg-gray-300 rounded-md mx-auto flex shadow-sm font-medium'>
          <div className={`border-r-2 border-gray-50 ${ panel === 1 ? 'bg-gray-400 text-white' : 'bg-gray-300'}`}><button onClick={() => onHandleclick(1)} className='w-full border-2 py-2 px-6 rounded-md'>Citas Pendientes</button></div>
          <div className={`border-r-2 border-gray-50 ${ panel === 2 ? 'bg-gray-400 text-white' : 'bg-gray-300'}`}><button onClick={() => onHandleclick(2)} className='w-full border-2 py-2 px-6 rounded-md'>Citas Programadas</button></div>
      </div>
    </div>
  )
}

const ViewCitas = () => {
  //States
  const [citas, setCitas] = useState([]);
  const [panel,setPanel] = useState<number>(1);
  //Intances
  const navigate = useNavigate();
  const apiClient = client();
  const {ToastContainer, messageToast} = toaster();


  const togglePanel = (p:number) => {
    setPanel(p)
  }


  const fetchCitas = async () => {
    try {
      const res = await apiClient.get('/api/citas/');
      if(res.status === 200){
        setCitas(res.data.body.data)
      }
      
    } catch (error) {
      //Redireccionamos por no estar autenticado
      if(error?.response?.data.statusCode === 401){
        navigate('/login');
      }
    }
  }

  useEffect(() => {
    const fetch = async() => {
      await fetchCitas();
    }

    fetch();
  },[]);

  return (
    <>
      Mis citas MEDICAS pERROS
      <Tabs 
        panel={panel}
        setPanel={togglePanel}
      />
    </>
  )
}

export default ViewCitas