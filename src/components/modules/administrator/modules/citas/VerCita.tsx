import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import client from "../../../../../api/client";
import { nameCookieSessionApp } from "../../../../../config";
import { deleteCookie } from "../../../../../utils/cookies";
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

const VerCita = () => {
  //States
  const [cita, setCita] = useState<Cita>();

  //Instances
  const params = useParams();
  const apiClient = client();
  const navigate = useNavigate();

  //Functions
  const fetchCita = async () => {
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

  useEffect(() => {
    const fetch = async () => {
      await fetchCita();
    };

    fetch();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-y-4 p-4">
      <div className="border-2 border-gray-200 bg-gray-50 rounded-md p-4">
        <form action="">
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 sm:flex-col lg:flex-row">
            {/* name */}
            <div className="sm:w-full lg:w-[45%]">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Paciente:
              </label>
              <input
                disabled
                type="text"
                placeholder="Manuel"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={
                  cita?.paciente.usuario.nombre
                    ? `${cita?.paciente.usuario.nombre} ${cita?.paciente.usuario.apellido}`
                    : ""
                }
              />
            </div>

            {/* name */}
            <div className="sm:w-full lg:w-[45%]">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Doctor:
              </label>
              <input
                disabled
                type="text"
                placeholder="Manuel"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={
                  cita?.doctor.nombre
                    ? `${cita?.doctor.nombre} ${cita?.doctor.apellido} ${cita?.doctor.especialidad}`
                    : ""
                }
              />
            </div>

            {/* name */}
            <div className="sm:w-full lg:w-[45%]">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fecha:
              </label>
              <input
                disabled
                type="text"
                placeholder="Manuel"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={
                  cita?.fecha ? `${cita?.fecha}` : "En espera de asignación"
                }
              />
            </div>

            {/* name */}
            <div className="sm:w-full lg:w-[45%]">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tipo de servicio:
              </label>
              <input
                disabled
                type="text"
                placeholder="Manuel"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={cita?.tipoServicio ? `${cita?.tipoServicio}` : ""}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerCita;
