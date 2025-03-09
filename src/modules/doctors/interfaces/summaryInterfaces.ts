import { DoctorResponse } from "../../administrator/interfaces/doctorsInterfaces";
import { PatientResponse } from "../../administrator/interfaces/patientInterfaces";

export interface MedicalSummaryDto {
  fecha: string;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
  tipoServicio: string;
  doctorId: number;
  pacienteId: number;
  historialMedicoId: number;
  citaId: number;
}

export interface MedicalSummaryResponse {
  id: number;
  fecha: Date;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
  tipoServicio: string;
  doctorId: number;
  pacienteId: number;
  historialMedicoId: number;
  citaId: number;
  doctor: DoctorResponse;
  paciente: PatientResponse;
}

