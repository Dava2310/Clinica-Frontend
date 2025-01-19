import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { regexName_lastname } from '../../../../utils/validators';
import { arrEspecialidades } from '../../../../config';
import client from '../../../../api/client';
import { useNavigate } from 'react-router-dom';
import { toaster } from '../../../../utils/toaster';
import Alert from '../../../common/alert/Alert';

type Cita = {
  tipoServicio:string,
  especialidad:string,
}

const CreateCitas = () => {
  //States
  const [errorP,setErrorP] = useState<string | undefined>();

  //Instances
  const apiClient = client();
  const navigate = useNavigate();
  const {ToastContainer, messageToast} = toaster();

  const { 
    register, 
    handleSubmit,
    reset, 
    formState: { errors,} 
  } =  useForm<Cita>();

  const onSubmit = handleSubmit( async (data) => {
    
    const formData = new FormData();
    formData.append('especialidad', data.especialidad);
    formData.append('tipoServicio', data.tipoServicio);
   
    try {
     const res = await apiClient.post('/api/citas/',formData); 
     if(res.status === 201) {
       reset()
       messageToast({
         message:res.data.body.message,
         position:'bottom-right',
         theme:'colored',
         type:'success'
       });
       setErrorP('')
     }
    } catch (err) {
      console.log(err)
      const message = err?.response.data.body.message;
      setErrorP(message)
      //Redireccionamos por no estar autenticado
      if(err?.response?.data.statusCode === 401){
       navigate('/login');
     }
    }
  });
  return (
    <>
      {errorP && <Alert message={errorP} type={'error'}/>}
      <div className='w-full h-full flex flex-col gap-y-4 px-4 py-2'>
        <div className='w-full h-full p-4'>
          {/* Formulario */}
          <form action=""  onSubmit={onSubmit} className='border-2 border-gray-300 rounded-md p-4 bg-gray-50 h-full overflow-hidden'>
          
            {/* Container datos de la cita */}
            <div className='w-full flex flex-col gap-y-3 '>
              <div>
                <h2 className='text-xl font-semibold text-gray-900s'>Datos de la cita médica:</h2>
              </div>

              <div className='flex flex-wrap justify-center gap-x-6 gap-y-4 sm:flex-col lg:flex-row'>
                {/* tipo de servicio */}
                <div className='sm:w-full lg:w-[42%]'>
                  <label htmlFor="tipoServicio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Indique el tipo de servicio:</label>
                  <input 
                    type="text"
                    placeholder=''    
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    { ...register("tipoServicio",{
                      required:{
                        value: true,
                        message: "El tipo de servicio es requerido",
                      }, 
                      pattern: {
                        value: regexName_lastname,
                        message: "El tipo de servicio cumple con el formato requerido.",
                      }
                    })}
                    />
                    {errors?.tipoServicio && <span className=' w-full text-red-500 text-sm'>{errors.tipoServicio?.message}</span>}
                </div>
                {/* especialidad */}
                <div className='sm:w-full lg:w-[45%]'>
                    <label htmlFor="especialidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Especialidad</label>
                    <select
                      { ...register("especialidad",{
                        required:{
                          value: true,
                          message: "La especialidad es requerido",
                        }, 
                        pattern: {
                          value: regexName_lastname,
                          message: "La especialidad no cumple con el formato requerido.",
                        }
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    >
                      <option value="">Seleccione una especialidad:</option>
                      {
                        arrEspecialidades.map(t => {
                          return <option key={t.type} value={t.type}>{t.type}</option>
                        })
                      }
                    </select>
                </div>
  
                {/* Container Button */}
                <div className='w-full flex justify-center mt-6'>
                  <button type="submit" className="w-[25%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Guardar</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer/>
      </div>
    </>
  )
}

export default CreateCitas