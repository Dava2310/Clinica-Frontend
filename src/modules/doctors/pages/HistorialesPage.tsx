import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import document from "../../../assets/document.png";
import usePatient from "../../administrator/hooks/usePatient";

const HistorialesPage = () => {
  const { patients } = usePatient();

  return (
    <div className="w-full h-full flex flex-col gap-y-2 p-4">
      <h1 className="p-0 font-medium text-lg">
        Seleccione Historial del paciente
      </h1>
      {patients.length ? (
        <div className=" ">
          <Table hoverable className="">
            <Table.Head className="w-full">
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Cédula</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Seguro médico</Table.HeadCell>
              <Table.HeadCell>Teléfono</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {patients?.map((e) => {
                return (
                  <Table.Row
                    key={e.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {e.usuario.nombre} {e.usuario.apellido}
                    </Table.Cell>
                    <Table.Cell>{e.usuario.cedula}</Table.Cell>
                    <Table.Cell>{e.usuario.email}</Table.Cell>
                    <Table.Cell>{e.seguroMedico}</Table.Cell>
                    <Table.Cell>{e.numeroTelefono}</Table.Cell>
                    <Table.Cell className="flex gap-x-2">
                      <Link
                        to={`/doctor/listado_resumenes/paciente/${e.usuario.id}`}
                      >
                        <button
                          type="button"
                          className="flex text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
              No hay registros de historiales medicos
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialesPage;
