import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import client from "../../../api/client";
import { nameCookieSessionApp } from "../../../config";
import { deleteCookie } from "../../../utils/cookies";
import { ApiError } from "../../common/interfaces/errorsApiInterface";

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

const SummaryPage = () => {
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
      if (res?.data.body.data) setResumen(res.data.body.data);
    } catch (error) {
      const handleError = (error: ApiError) => {
        if (error?.response?.data?.statusCode === 401) {
          deleteCookie(nameCookieSessionApp);
          navigate("/login");
        }
      };

      handleError(error as ApiError);
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
              value={
                resumen
                  ? `${resumen?.paciente?.usuario?.nombre} ${resumen?.paciente?.usuario?.apellido} C.I. ${resumen?.paciente?.usuario?.cedula}`
                  : ""
              }
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
              value={resumen ? resumen.tipoServicio : ""}
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
                  value={resumen ? resumen?.diagnostico : ""}
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
                  value={resumen ? resumen.tratamiento : ""}
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
                  value={resumen ? resumen.observaciones : ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-32"
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SummaryPage;
