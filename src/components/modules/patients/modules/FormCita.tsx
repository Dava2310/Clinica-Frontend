import React from 'react'
import { Panel } from '../../../../types'
type PropsFormCita = {
  onSelectedPanel: (p: Panel) => void
}
const FormCita = ({
  onSelectedPanel
}:PropsFormCita) => {

  const selectedPanel = () => onSelectedPanel(1);
  return (
    <div> <button onClick={selectedPanel}>Regresar</button> FormCita</div>
  )
}

export default FormCita