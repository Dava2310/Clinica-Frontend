export interface DoctorDto  {
  id?:number
  userId: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  password:string;
  especialidad: string;
  numeroTelefono: string;
};

export interface DoctorResponse  {
  id: number;
  userId: number;
  especialidad: string;
  numeroTelefono: string;
  usuario: User;
};

export interface User {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  tipoUsuario: string;
}

