import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { nameCookieSessionApp } from "../../../../config";
import { deleteCookie, getCookie } from "../../../../utils/cookies";
import { ErrorResponse, PropsToken } from "../../../../types";
import client from "../../../../api/client";
import { Link, useNavigate } from "react-router-dom";

export interface ResumenesResponseInterface {
  error: boolean;
  status: number;
  body: Body;
}

export interface Body {
  data: Datum[];
}

export interface Datum {
  id: number;
  observaciones: null;
  createdAt: Date;
  updatedAt: Date;
  pacienteId: number;
  paciente: Paciente;
  resumenesMedicos: ResumenesMedico[];
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

export interface ResumenesMedico {
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
  doctor: Doctor;
}

export interface Doctor {
  id: number;
  especialidad: string;
  numeroTelefono: string;
  userId: number;
  usuario: Usuario;
}

const ResumenesMedicos = () => {
  //States
  const [historiales, setHistoriales] = useState<Datum[]>([]);
  const [namePaciente, setNamePaciente] = useState<string>("");
  const [historialesFilter, setHistorialesFilter] = useState<Datum[]>([]);

  //Instances
  const apiClient = client();
  const navigate = useNavigate();

  //Functions
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamePaciente(e.target.value);
  };

  const filterToPaciente = () => {
    if (namePaciente === "") return setHistorialesFilter(historiales);

    const filter = historiales.filter((h) =>
      h.paciente.usuario.nombre
        .toLowerCase()
        .includes(namePaciente.toLowerCase())
    );

    setHistorialesFilter(filter);
  };

  const filterResumenes = (arr: Datum[]) => {
    const token = getCookie(nameCookieSessionApp) as PropsToken;
    return arr
      .filter((h) => h.resumenesMedicos.length > 0)
      .filter((h) =>
        h.resumenesMedicos.filter(
          (r) => Number(r.doctor.userId) === Number(token.id)
        )
      );
  };

  const fetchResumenes = async () => {
    try {
      const res = await apiClient.get(`/api/historiales/`);
      if (res?.data.body.data !== undefined) {
        setHistoriales(filterResumenes(res.data.body.data));
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
      await fetchResumenes();
    };

    fetch();
  }, []);

  useEffect(() => {
    if (historiales.length > 0) {
      filterToPaciente();
    }
  }, [historiales, namePaciente]);

  return (
    <div className="w-full h-full flex flex-col gap-y-2 px-4 py-2">
      <h1 className="p-0 font-medium text-lg">Historiales Medicos:</h1>
      {/* Contenedor Button y buscador */}
      <div className="w-full flex justify-end items-center gap-x-4 border-2 border-gray-300 rounded-md p-2 bg-gray-50">
        {/* Button */}
        {/* <button type="button"  className="w-44 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Registrar paciente</button> */}

        {/* Buscador */}
        <div className="sm:w-full lg:w-[30%]">
          <label
            htmlFor="name"
            className="block mb-0.5 text-sm font-medium text-gray-900 dark:text-white"
          >
            Filtrar por paciente:
          </label>
          <input
            type="text"
            onChange={onHandleChange}
            placeholder="Ingresa un nombre"
            className="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      {/* Contendor table */}
      <div className="overflow-x-auto w-full max-h-full border-2 bg-gray-50 border-gray-300 rounded-md py-2">
        <Table hoverable className="">
          <Table.Head className="w-full">
            <Table.HeadCell>Paciente</Table.HeadCell>
            <Table.HeadCell>Cédula</Table.HeadCell>
            <Table.HeadCell>Teléfono</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {historialesFilter.length > 0 &&
              historialesFilter.map((e) => {
                return (
                  <Table.Row
                    key={e.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {e.paciente.usuario.nombre} {e.paciente.usuario.apellido}
                    </Table.Cell>
                    <Table.Cell>{e.paciente.usuario.cedula}</Table.Cell>
                    <Table.Cell>{e.paciente.numeroTelefono}</Table.Cell>
                    <Table.Cell className="flex gap-x-2">
                      <Link to={`/doctor/listado_resumenes/${e.id}`}>
                        <button
                          type="button"
                          className="w-fit  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Ver resúmenes
                        </button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ResumenesMedicos;
