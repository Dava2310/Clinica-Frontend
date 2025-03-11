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
  opciones:Options[]
}

export interface Options {
  fecha: string;
  id: number;
  idCita: number;
  idDoctor: number;
}

export enum PanelEnum {
  Solicitadas = 1,
  EnProceso = 2,
  Programadas = 3,
}

export interface AppointmentDto {
  tipoServicio: string;
  especialidad: string;
}

