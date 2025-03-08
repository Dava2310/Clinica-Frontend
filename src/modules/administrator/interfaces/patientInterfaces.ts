export interface PatientDto {
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
  userId: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  numeroTelefono: string;
  tipoSangre: string;
  direccion: string;
  seguroMedico: string;
};