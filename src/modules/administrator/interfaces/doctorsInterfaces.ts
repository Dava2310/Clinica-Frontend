export interface DoctorDto  {
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
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  especialidad: string;
  numeroTelefono: string;
};


