import { HiShoppingBag, HiUser } from "react-icons/hi"
import { IoMdCreate } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { FaPersonCane, FaUserDoctor } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";

export const urlsDoctors = [
  {
    icon:HiShoppingBag,
    name:"Citas",
    urls:[
        {url:"doctor/ver_citas",name:"Citas Pendientes"}
    ]
  },
  {
    icon:HiShoppingBag,
    name:"Resúmenes Medicos",
    urls:[
        {url:"doctor/ver_resumenes",name:"resúmenes"},
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
    icon: FaUserDoctor,
    name:"Doctor",
    urls:[
        {url:"administrador/ver_doctores",name:"Ver Doctores"},
    ]
  },
  {
    icon: FaPersonCane,
    name:"Paciente",
    urls:[
        {url:"administrador/ver_pacientes",name:"Ver Pacientes"},
    ]
  },
  {
    icon: RiAdminFill,
    name:"Administrador",
    urls:[
        {url:"administrador/ver_administradores",name:"Ver Pacientes"},
    ]
  },
  {
    icon: CiCalendarDate,
    name:"Citas",
    urls:[
        {url:"administrador/ver_citas",name:"Ver citas"},
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