import React, { useState } from 'react'
import { toaster } from '../../../../utils/toaster';
import SeleccionarDoctor from './SeleccionarDoctor';
import FormCita from './FormCita';
import { Panel } from '../../../../types';
import { useForm } from 'react-hook-form';

type Inputs = {
  tipoServicio:string,
  fecha:Date,
}

const CreateCita = () => {
  //States
  const [panel,setPanel] = useState<Panel>(1);
  const [doctorSelected, setDoctorSelected] = useState<number>();
  const {ToastContainer, messageToast} = toaster();

  const { 
    register, 
    handleSubmit,
    reset, 
    formState: { errors,} 
  } =  useForm<Inputs>();

  //Functions
  const onSelectedPanel = (p:Panel) => setPanel(p);
  const setDoctor = (e:number) => setDoctorSelected(e);
  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })

  return (
    <>
      <div className='w-full h-full flex flex-col gap-y-4 p-4'>
        {
          panel === 1 
            ?
              <SeleccionarDoctor 
                onSelectedPanel={onSelectedPanel} 
                panel={panel}
                setDoctor={setDoctor}
                doctor={doctorSelected} 
                messageToast={messageToast}
              />
            :
              <FormCita
                onSelectedPanel={onSelectedPanel}
                register={register}
                errors={errors}
                onSubmit={onSubmit}
              />
        }
     
      <ToastContainer/>
    </div>
    </> 
  )
}

export default CreateCita