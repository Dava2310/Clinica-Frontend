export interface PatientDto {
  id?:number
  userId: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  password:string;
  numeroTelefono: string;
  tipoSangre: string;
  direccion: string;
  seguroMedico: string;
};

export interface PatientResponse {
  id: number;
  tipoSangre: string;
  direccion: string;
  numeroTelefono: string;
  seguroMedico: string;
  userId: number;
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