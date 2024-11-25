import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi"

export const urlsDoctors = [
    {
      icon: HiUser,
      name:"Doctores",
      urls:[
          {url:"doctors/modify",name:"Modificar datos"},
          {url:"doctors/view",name:"Ver Doctores"},
      ]
    },
    {
      icon:HiShoppingBag,
      name:"Citas",
      urls:[
          {url:"doctors/citas_pendientes",name:"Citas Pendientes"}
      ]
  }
]

export const urlsPatients = [
  {
      icon: HiUser,
      name:"Pacientes",
      urls:[
          {url:"patients/create_quotes",name:"Crear cita"}, 
          {url:"patients/modify",name:"Modificar datos"},
          {url:"patients/quotes",name:"Ver citas"},
      ]
  },
]

export const urlsAdministrator = [
  {
      icon: HiUser,
      name:"Administrador",
      urls:[
          {url:"users/create",name:"Crear Usuario"}, 
          {url:"users/modify",name:"Modificar Usuario"},
          {url:"users/delete",name:"Eliminar Usuario"},
          {url:"users/view",name:"Ver Usuarios"},
      ]
  },
 
]

export const nameCookieSessionApp = 'cookie_clinica_backend'

export const childrenTypeUsers = [
  {
    type: "doctor",
    url:"/doctors/"
  },
  {
    type:"paciente",
    url:"/patients/"
  },
]

export const typeUsers = { 
  doctor: "doctor", 
  paciente: "paciente" 
}