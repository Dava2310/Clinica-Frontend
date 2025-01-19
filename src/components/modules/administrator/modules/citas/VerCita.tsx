import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import client from '../../../../../api/client';
import { nameCookieSessionApp } from '../../../../../config';
import { deleteCookie } from '../../../../../utils/cookies';

const VerCita = () => {
    //States
    const [cita, setCita] = useState();

    //Instances
    const params = useParams();
    const apiClient = client();
    const navigate = useNavigate();

    //Functions
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

    useEffect(() => {
        const fetch = async () => {
            await fetchCita();
        }

        fetch();
    },[])



  return (
    <div className='w-full h-full flex flex-col gap-y-4 p-4'>
        VerCita
    </div>
  )
}

export default VerCita