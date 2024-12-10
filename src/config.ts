import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi"
import { IoMdCreate } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";

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
      icon: IoMdCreate,
      name:"Solicitar cita",
      urls:[
          {url:"paciente/solicitar_cita",name:"Solicitar cita"},
      ]
  },
  {
    icon: FaClipboardList,
    name:"Ver citas",
    urls:[
        {url:"paciente/ver_citas",name:"Ver citas"},
    ]
  },
]

export const urlsAdministrator = [ 
  {
    icon: HiUser,
    name:"Doctor",
    urls:[
        {url:"administrador/ver_doctores",name:"Ver Doctores"},
    ]
  },
  {
    icon: HiUser,
    name:"Paciente",
    urls:[
        {url:"administrador/ver_pacientes",name:"Ver Pacientes"},
    ]
  },
  {
    icon: HiUser,
    name:"Administrador",
    urls:[
        {url:"administrador/ver_administradores",name:"Ver Pacientes"},
    ]
  },
]

export const nameCookieSessionApp = 'cookie_clinica_backend'

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

export const arrTipoSangre = [
  {
    type:"A+",
  },
  {
    type:"A-", 
  },
  {
    type:"B+",
  },
  {
    type:"B-",
  },
  {
    type:"AB+",
  },
  {
    type:"AB-",
  },
  {
    type:"O+",
  },
  {
    type:"O-",
  } 
]

export const arrEspecialidades = [
  {
    type:"Cardiología",
  },
  {
    type:"Gastroenterología",
  },
  {
    type:"Neurología",
  },
  {
    type:"Oncología",
  },
  {
    type:"Pediatría",
  },
  {
    type:"Psiquiatría",
  },
  {
    type:"Urología",
  },
  {
    type:"Traumatología",
  }
]