import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import useMedicalSummaries from "../hooks/useMedicalSummaries";

const MedicalSummariesPage = () => {
  const { historiesFilter, onHandleChange } = useMedicalSummaries();

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

      {/* Contenedor table */}
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
            {historiesFilter.length > 0 &&
              historiesFilter.map((e) => {
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

export default MedicalSummariesPage;
