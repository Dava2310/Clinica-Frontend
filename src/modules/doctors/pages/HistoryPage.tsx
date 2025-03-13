import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { showDate } from "../../../utils/utilidades";
import useHistoryPatients from "../hooks/useHistoryPatients";
import document from "../../../assets/document.png";

const HistoryPage = () => {
  const { histories } = useHistoryPatients();
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
              histories
                ? `${histories.paciente.usuario.nombre} ${histories.paciente.usuario.apellido} C.I. ${histories.paciente.usuario.cedula}`
                : ""
            }`}
            placeholder="Ingresa un nombre"
            className="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      {/* Contendor table */}

      {histories && histories.resumenesMedicos.length ? (
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
              {histories?.resumenesMedicos.map((e) => {
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
                      <Link to={`/doctor/ver_resumen/${e.id}`}>
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
      ) : (
        <div className="flex justify-center items-end rounded-md">
          <div className="grid justify-center items-center">
            <div className="flex justify-center">
              <img src={document} alt="citas" />
            </div>
            <p className="text-md text-center font-medium">
              No hay registros de resúmenes medicos
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
