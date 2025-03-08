import React, { useEffect, useState } from "react";
import Alert from "../../../common/alert/Alert";
import client from "../../../../api/client";
import { useNavigate, useParams } from "react-router-dom";
import { toaster } from "../../../../utils/toaster";
import { useForm } from "react-hook-form";
import { regexName_lastname } from "../../../../utils/validators";
import { deleteCookie } from "../../../../utils/cookies";
import { nameCookieSessionApp } from "../../../../config";
import { formatDate } from "../../../../utils/utilidades";

interface Opciones {
  fecha: string;
  id: number;
  idCita: number;
  idDoctor: number;
}

interface Doctor {
  id: number;
  especialidad: string;
  numeroTelefono: string;
  userId: number;
  cedula: string;
  nombre: string;
  apellido: string;
  email: string;
  tipoUsuario: string;
}

interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
}

interface Paciente {
  id: number;
  userId: number;
  usuario: Usuario;
  numeroTelefono: string;
}

interface Cita {
  especialidad: string;
  estado: string;
  tipoServicio: string;
  opciones: Opciones[];
  doctor: Doctor;
  paciente: Paciente;
  fecha: string;
}

interface resumenMedico {
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

const FinalizarCita = () => {
  //States
  const [errorP, setErrorP] = useState<string | undefined>();
  const [cita, setCita] = useState<Cita>();

  //Instances
  const apiClient = client();
  const navigate = useNavigate();
  const { ToastContainer, messageToast } = toaster();
  const params = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<resumenMedico>();

  //Funciones
  const fetchDataCita = async () => {
    try {
      const res = await apiClient.get(`/api/citas/opciones/${params.citaId}`);
      console.log(res);
      if (res.status === 200) {
        setCita(res.data.body.data);
      }
    } catch (error) {
      console.log(error);
      //Redireccionamos por no estar autenticado
      if (error?.response?.data.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }

      if (error?.response?.status == 404) {
        //
      }
    }
  };

  const onSubmit = handleSubmit(async (data: resumenMedico) => {
    const formData = new FormData();
    formData.append("diagnostico", data.diagnostico);
    formData.append("tratamiento", data.tratamiento);
    formData.append("observaciones", data.observaciones);
    formData.append("tipoServicio", cita?.tipoServicio as string);
    formData.append("citaId", `${params.citaId as string}`);
    formData.append("fecha", formatDate(new Date()));

    try {
      const res = await apiClient.post(`/api/resumenes/`, formData);
      console.log(res);
      if (res.data.status == 201) {
        messageToast({
          message: res.data.body.message,
          position: "bottom-right",
          theme: "colored",
          type: "success",
        });

        setTimeout(() => {
          navigate("/doctor/ver_citas");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      //Redireccionamos por no estar autenticado
      if (error?.response?.data.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  });

  //Useeffect
  useEffect(() => {
    const fetch = async () => {
      await fetchDataCita();
    };

    fetch();
  }, []);

  return (
    // Container
    <>
      {errorP && <Alert message={errorP} type={"error"} />}

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
              value={`${cita?.paciente?.usuario.nombre} ${cita?.paciente?.usuario.apellido}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* Fecha de la cita */}
          <div className="sm:w-full lg:w-[30%]">
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fecha de la cita:
            </label>
            <input
              disabled
              type="text"
              placeholder=""
              value={cita?.fecha ? cita?.fecha : ""}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* Tipo de servcio */}
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
              value={cita?.tipoServicio}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        {/* Formulario */}
        <form
          action=""
          className="border-2 border-gray-300 rounded-md p-4 bg-gray-50 overflow-hidden"
          onSubmit={onSubmit}
        >
          {/* Container datos personales */}
          <div className="w-full flex flex-col gap-y-3 ">
            <div>
              <h2 className="text-xl font-semibold text-gray-900s">
                Datos de la consulta:
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
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("diagnostico", {
                    required: {
                      value: true,
                      message: "El diagnostico es requerido",
                    },
                    pattern: {
                      value: regexName_lastname,
                      message:
                        "El diagnostico no cumple con el formato requerido.",
                    },
                  })}
                />
                {errors?.diagnostico && (
                  <span className=" w-full text-red-500 text-sm">
                    {errors.diagnostico?.message}
                  </span>
                )}
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
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("tratamiento", {
                    required: {
                      value: true,
                      message: "El tratamiento es requerido",
                    },
                    pattern: {
                      value: regexName_lastname,
                      message:
                        "El tratamiento no cumple con el formato requerido.",
                    },
                  })}
                />
                {errors?.tratamiento && (
                  <span className=" w-full text-red-500 text-sm">
                    {errors.tratamiento?.message}
                  </span>
                )}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-32"
                  {...register("observaciones", {
                    required: {
                      value: true,
                      message: "Las observaciones son requeridas",
                    },
                    pattern: {
                      value: regexName_lastname,
                      message:
                        "Las observaciones no cumple con el formato requerido.",
                    },
                  })}
                ></textarea>
                {errors?.observaciones && (
                  <span className=" w-full text-red-500 text-sm">
                    {errors.observaciones?.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-2">
            <button
              type="submit"
              className="w-fit text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Finalizar cita
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default FinalizarCita;
