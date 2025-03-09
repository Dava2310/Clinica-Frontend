import { PatientResponse } from "../../administrator/interfaces/patientInterfaces";
import { MedicalSummaryResponse } from "./summaryInterfaces";

export interface HistoryPatientResponse {
  id: number;
  observaciones: null;
  createdAt: Date;
  updatedAt: Date;
  pacienteId: number;
  paciente: PatientResponse;
  resumenesMedicos: MedicalSummaryResponse[];
}



