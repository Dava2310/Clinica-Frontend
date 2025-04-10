import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import { showDate } from "../../../utils/utilidades";
import useAppointment from "../hooks/useAppointment";
import document from "../../../assets/document.png";

const AppointmentPage = () => {
  const { filteredAppointment, onHandleChange } = useAppointment();
  return (
    <div className="w-full h-full flex flex-col gap-y-2 p-4">
      {/* Contenedor Button y buscador */}
      <h1 className="p-0 font-medium text-lg">Citas Medicas</h1>
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
            onChange={onHandleChange}
            placeholder="Ingresa un nombre"
            className="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      {/* Contenedor table */}
      {filteredAppointment.length > 0 ? (
        <div className="overflow-x-auto w-full max-h-full flex flex-grow justify-center border-2 bg-gray-50 border-gray-300 rounded-md py-2">
          <Table hoverable className="">
            <Table.Head className="w-full">
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Tipo de servicio</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Fecha</Table.HeadCell>
              <Table.HeadCell>Teléfono</Table.HeadCell>
              <Table.HeadCell>Correo Electrónico</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {filteredAppointment.map((e) => {
                return (
                  <Table.Row
                    key={e.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {e.paciente.usuario.nombre} {e.paciente.usuario.apellido}
                    </Table.Cell>
                    <Table.Cell>{e.tipoServicio}</Table.Cell>
                    <Table.Cell>{e.estado}</Table.Cell>
                    <Table.Cell>{showDate(e.fecha)}</Table.Cell>
                    <Table.Cell>{e.paciente.numeroTelefono}</Table.Cell>
                    <Table.Cell>{e.paciente.usuario.email}</Table.Cell>
                    <Table.Cell className="flex gap-x-2">
                      <Link to={`/doctor/finalizar_cita/${e.id}`}>
                        <button
                          type="button"
                          className="w-fit  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Atender
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
              No hay registros de citas medicas
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
