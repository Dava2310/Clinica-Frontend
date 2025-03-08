import { DoctorResponse } from "./doctorsInterfaces";
import { PatientResponse } from "./patientInterfaces";

export interface AppointmentResponse {
  especialidad: string;
  estado: string;
  fecha: string;
  id: number;
  idDoctor: number;
  idPaciente: number;
  tipoServicio: string;
  paciente: PatientResponse;
  doctor: DoctorResponse
  opciones:Opciones
}

interface Opciones {
  fecha: string;
  id: number;
  idCita: number;
  idDoctor: number;
}

