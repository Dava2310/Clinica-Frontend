import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import client from "../../../../api/client";
import { ErrorResponse } from "../../../../types";
import { nameCookieSessionApp } from "../../../../config";
import { deleteCookie } from "../../../../utils/cookies";

export interface ResumenResponseInterface {
  data: Data;
}

export interface Data {
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
  paciente: Paciente;
}

export interface Paciente {
  id: number;
  tipoSangre: string;
  direccion: string;
  numeroTelefono: string;
  seguroMedico: string;
  userId: number;
  usuario: Usuario;
}

export interface Usuario {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  tipoUsuario: string;
}

const VerResumenByPaciente = () => {
  //States
  const [resumen, setResumen] = useState<Data>();

  //Instances
  const apiClient = client();
  const params = useParams();
  const navigate = useNavigate();

  //Functions
  const fetchResumen = async () => {
    try {
      const res = await apiClient.get(`/api/resumenes/${params.resumenId}`);
      if (res?.data.body.data !== undefined) {
        console.log(res.data.body.data);
        setResumen(res.data.body.data);
      }
    } catch (error) {
      const handleError = (error: ErrorResponse) => {
        if (error?.response?.data?.statusCode === 401) {
          deleteCookie(nameCookieSessionApp);
          navigate("/login");
        } else if (error?.response?.status === 404) {
          console.log(error.response.data?.message);
        }
      };

      handleError(error as ErrorResponse);
    }
  };

  //Effects
  useEffect(() => {
    const fetch = async () => {
      await fetchResumen();
    };

    fetch();
  }, []);

  return (
    <>
      <div className="w-full h-full p-4">
        <div className="border-2 border-gray-300 rounded-md p-4 mb-4 bg-gray-50 h-fit flex justify-between">
          {/* Paciente */}
          <div className="sm:w-full lg:w-[30%]">
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Paciente:
            </label>
            <input
              id="paciente"
              disabled
              type="text"
              placeholder=""
              value={`${resumen?.paciente?.usuario?.nombre} ${resumen?.paciente?.usuario?.apellido} C.I. ${resumen?.paciente?.usuario?.cedula}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* Tipo de servicio */}
          <div className="sm:w-full lg:w-[30%]">
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de servicio:
            </label>
            <input
              disabled
              type="text"
              placeholder=""
              value={`${resumen?.tipoServicio}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        {/* Formulario */}
        <form
          action=""
          className="border-2 border-gray-300 rounded-md p-4 bg-gray-50 overflow-hidden"
        >
          {/* Container datos personales */}
          <div className="w-full flex flex-col gap-y-3 ">
            <div>
              <h2 className="text-xl font-semibold text-gray-900s">
                Datos del resumen:
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 sm:flex-col lg:flex-row">
              {/* diagnostico */}
              <div className="sm:w-full lg:w-[45%]">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Diagnostico:
                </label>
                <input
                  type="text"
                  disabled
                  placeholder=""
                  value={`${resumen?.diagnostico}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* tratamiento */}
              <div className="sm:w-full lg:w-[45%]">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tratamiento:
                </label>
                <input
                  type="text"
                  disabled
                  placeholder=""
                  value={`${resumen?.tratamiento}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* Observaciones */}
              <div className="sm:w-full lg:w-[45%]">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Observaciones:
                </label>
                <textarea
                  disabled
                  value={resumen?.observaciones}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-32"
                ></textarea>
              </div>
            </div>
          </div>

          {/* <div className="w-full flex justify-center mt-2">
            <button
              type="submit"
              className="w-fit text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Finalizar cita
            </button>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default VerResumenByPaciente;
