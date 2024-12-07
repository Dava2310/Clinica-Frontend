import React, { useState } from 'react'
import { toaster } from '../../../../utils/toaster';
import SeleccionarDoctor from './SeleccionarDoctor';
import FormCita from './FormCita';
import { Panel } from '../../../../types';

const CreateCita = () => {
  //States
  const [panel,setPanel] = useState<Panel>(1);
  const {ToastContainer, messageToast} = toaster();

  //Functions
  const onSelectedPanel = (p:Panel) => setPanel(p);

  return (
    <>
      <div className='w-full h-full flex flex-col gap-y-4 p-4'>
        {
          panel === 1 
            ?
              <SeleccionarDoctor onSelectedPanel={onSelectedPanel} panel={panel} messageToast={messageToast}/>
            :
              <FormCita onSelectedPanel={onSelectedPanel}/>
        }
     
      <ToastContainer/>
    </div>
    </>
  )
}

export default CreateCita