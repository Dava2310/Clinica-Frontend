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
          {url:"create_quotes",name:"Crear cita"}, 
          {url:"modify",name:"Modificar datos"},
          {url:"quotes",name:"Ver citas"},
      ]
  },
]

export const urlsAdministrator = [
  {
      icon: HiUser,
      name:"Administrador",
      urls:[
          {url:"admin/create",name:"Crear Usuario"}, 
          {url:"admin/modify",name:"Modificar Usuario"},
          {url:"admin/view",name:"Ver Administradores"},
      ]
  },
  {
    icon: HiUser,
    name:"Doctor",
    urls:[
        {url:"administrador/crear_doctor",name:"Crear Doctor"}, 
        {url:"administrador/modificar_doctor",name:"Modificar Doctor"},
        {url:"administrador/ver_doctores",name:"Ver Doctores"},
    ]
  },

 
]

export const nameCookieSessionApp = 'cookie_clinica_backend'
export const nameRefrehshCookieSessionApp = 'refresh_cookie_clinica_backend'
export const dataUserToken = 'data_user'

export const prefixUrlsTypeUsers = [
  {
    type: "doctor",
    url:"/doctor/",
  },
  {
    type:"paciente",
    url:"/paciente/",
  },
  {
    type:"administrador",
    url:"/administrador/",
  },
]

export const typeUsers = { 
  doctor: "doctor", 
  paciente: "paciente",
  administrador: "administrador" 
}