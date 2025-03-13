import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";

import client from "../../../api/client";
import { PropsToken } from "../../../types";
import { nameCookieSessionApp } from "../../../config";
import { deleteCookie, getCookie } from "../../../utils/cookies";
import { showDate } from "../../../utils/utilidades";
import { ApiError } from "../../common/interfaces/errorsApiInterface";
import { MedicalSummaryResponse } from "../../doctors/interfaces/summaryInterfaces";

const SummaryListPage = () => {
  //States
  const [summaries, setSummaries] = useState<MedicalSummaryResponse[]>([]);
  const token = getCookie(nameCookieSessionApp) as PropsToken;

  //Intances
  const apiClient = client();
  const navigate = useNavigate();

  //Functions
  const fetchSummaries = async () => {
    try {
      const res = await apiClient.get(`/api/resumenes/paciente/${token.id}`);
      if (res.data.body.data) setSummaries(res.data.body.data);
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

  useEffect(() => {
    const fetch = async () => {
      await fetchSummaries();
    };

    fetch();
  }, []);
  return (
    <div className="w-full h-full flex flex-col gap-y-2 p-4">
      {/* Contenedor Button y buscador */}
      <h1 className="p-0 font-medium text-lg">Resúmenes Medicos</h1>
      <div className="w-full flex justify-end items-center gap-x-4 border-2 border-gray-300 rounded-md p-2 bg-gray-50">
        {/* Button */}
        {/* <button type="button"  className="w-44 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Registrar paciente</button> */}

        {/* Buscador */}
        <div className="sm:w-full lg:w-[30%]">
          <label
            htmlFor="name"
            className="block mb-0.5 text-sm font-medium text-gray-900 dark:text-white"
          >
            Paciente:
          </label>
          <input
            type="text"
            value={`${
              summaries.length
                ? `${summaries[0]?.paciente?.usuario?.nombre} ${summaries[0]?.paciente?.usuario?.apellido} ${summaries[0]?.paciente?.usuario?.cedula}`
                : ""
            }`}
            placeholder="Ingresa un nombre"
            className="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      {/* Contendor table */}
      <div className="overflow-x-auto w-full max-h-full border-2 bg-gray-50 border-gray-300 rounded-md py-2">
        <Table hoverable align="center" className="">
          <Table.Head className="w-full">
            <Table.HeadCell>Doctor</Table.HeadCell>
            <Table.HeadCell>Especialidad</Table.HeadCell>
            <Table.HeadCell>Tipo de servicio</Table.HeadCell>
            <Table.HeadCell>Fecha</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {summaries.length > 0 &&
              summaries?.map((e) => {
                return (
                  <Table.Row
                    key={e.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {`${e.doctor.usuario.nombre}  ${e.doctor.usuario.apellido}`}
                    </Table.Cell>
                    <Table.Cell>{e.doctor.especialidad}</Table.Cell>
                    <Table.Cell>{e.tipoServicio}</Table.Cell>
                    <Table.Cell>{showDate(`${e.fecha}`)}</Table.Cell>
                    <Table.Cell className="flex gap-x-2">
                      <Link to={`/paciente/ver_resumen/${e.id}`}>
                        <button
                          type="button"
                          className="w-fit  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Ver
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

export default SummaryListPage;
