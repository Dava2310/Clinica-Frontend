import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { AppointmentResponse } from "../interfaces/appointmentInterfaces";
import document from "../../../assets/document.png";

type PropsPendingAppointments = {
  filteredAppointment: AppointmentResponse[];
  modalOpen: (e: number) => void;
};

const PendingAppointments = ({
  filteredAppointment,
  modalOpen,
}: PropsPendingAppointments) => {
  return (
    <Table hoverable className="">
      <Table.Head className="w-full">
        <Table.HeadCell>Paciente</Table.HeadCell>
        <Table.HeadCell>Servicio</Table.HeadCell>
        <Table.HeadCell>Especialidad</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>

      <Table.Body className="divide-y">
        {filteredAppointment.length > 0 ? (
          filteredAppointment.map((e) => {
            return (
              <Table.Row
                key={e.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {`${e.paciente.usuario.nombre} ${e.paciente.usuario.apellido}`}
                </Table.Cell>
                <Table.Cell>{e.tipoServicio}</Table.Cell>
                <Table.Cell>{e.especialidad}</Table.Cell>
                <Table.Cell>En espera de aprobación</Table.Cell>
                <Table.Cell className="flex gap-x-2">
                  <Link to={`/administrador/ver_cita/${e.id}`}>
                    <button
                      type="button"
                      className="w-fit text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Ver
                    </button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      modalOpen(e.id);
                    }}
                    className="w-24  text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Cancelar
                  </button>
                </Table.Cell>
              </Table.Row>
            );
          })
        ) : (
          <div className="flex flex-col">
            <div>
              <img src={document} alt="citas" />
            </div>
            <p>No hay citas pendientes</p>
          </div>
        )}
      </Table.Body>
    </Table>
  );
};

export default PendingAppointments;
