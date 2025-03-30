import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import useMedicalSummaries from "../hooks/useMedicalSummaries";
import { showDate } from "../../../utils/utilidades";
import document from "../../../assets/document.png";

const MedicalSummariesPage = () => {
  const { summaries, params } = useMedicalSummaries();

  return (
    <div className="w-full h-full flex flex-col gap-y-2 px-4 py-2">
      <h1 className="p-0 font-medium text-lg">Resúmenes Medicos:</h1>
      {/* Contenedor Button y buscador */}

      {/* Contenedor table */}
      {summaries.length ? (
        <div className="overflow-x-auto w-full max-h-full border-2 bg-gray-50 border-gray-300 rounded-md py-2">
          <Table hoverable className="">
            <Table.Head className="w-full">
              <Table.HeadCell>Paciente</Table.HeadCell>
              <Table.HeadCell>Cédula</Table.HeadCell>
              <Table.HeadCell>Fecha</Table.HeadCell>
              <Table.HeadCell>Dirección</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {summaries?.map((e) => {
                return (
                  <Table.Row
                    key={e.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {e.paciente.usuario.nombre} {e.paciente.usuario.apellido}
                    </Table.Cell>
                    <Table.Cell>{e.paciente.usuario.cedula}</Table.Cell>
                    <Table.Cell>{showDate(e.fecha.toString())}</Table.Cell>
                    <Table.Cell>{e.paciente.direccion}</Table.Cell>
                    <Table.Cell className="flex gap-x-2">
                      <Link
                        to={`/doctor/listado_resumenes/paciente/${params.pacienteId}/resumen/${e.id}`}
                      >
                        <button
                          type="button"
                          className="w-fit  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Ver resumen
                        </button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div className="flex justify-center items-end rounded-md">
          <div className="grid justify-center items-center">
            <div className="flex justify-center">
              <img src={document} alt="citas" />
            </div>
            <p className="text-md text-center font-medium">
              No hay registros de resúmenes para este paciente
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalSummariesPage;
