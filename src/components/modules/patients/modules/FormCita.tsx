import React from 'react'
import { Panel } from '../../../../types'
// import Alert from '../../../common/alert/Alert'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { regexName_lastname } from '../../../../utils/validators'
import { IoArrowBackCircleSharp } from "react-icons/io5";

type Inputs = {
  tipoServicio:string,
  fecha:Date,
}

type PropsFormCita = {
  onSelectedPanel: (p: Panel) => void,
  register: UseFormRegister<Inputs>,
  onSubmit: () => void,
  errors: FieldErrors
}

const FormCita = ({
  onSelectedPanel,
  register,
  onSubmit,
  errors
}:PropsFormCita) => {

  const selectedPanel = () => onSelectedPanel(1);
  return (
    <div>
      <div className='border-2 border-gray-300 rounded-md bg-gray-50 flex items-center px-2'>
        <button className='' 
          onClick={selectedPanel}
          >
          <IoArrowBackCircleSharp className='w-9 h-10'color={'bg-blue-500'}/>
        </button>
      </div>
      {/* {errorP && <Alert message={errorP} type={'error'}/>} */}

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
                {/* fecha */}
                <div className='sm:w-full lg:w-[42%]'>
                  <label htmlFor="fecha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Indique la Fecha:</label>
                  <input 
                    type="datetime-local"
                    placeholder=''    
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    { ...register("fecha",{
                      required:{
                        value: true,
                        message: "La fecha es requerida",
                      }, 
                    })}
                    />
                    {errors?.fecha && <span className=' w-full text-red-500 text-sm'>{errors.fecha?.message}</span>}
                </div>
  
                {/* Container Button */}
                <div className='w-full flex justify-center mt-6'>
                  <button type="submit" className="w-[25%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Guardar</button>
                </div>
              </div>
            </div>
        </form>
      </div>
    </div>
  )
}

export default FormCita