export interface AdminDto  {
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  password: string;
};

export interface AdminResponse{
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  password: string;
  userId: number;
}