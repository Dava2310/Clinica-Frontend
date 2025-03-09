import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import MyModal from "../../common/components/Modal";
import { ToastContainer } from "react-toastify";
import useDoctor from "../hook/useDoctor";

const DoctorPage = () => {
  const {
    doctors,
    filteredDoctors,
    openModal,
    filterDoctors,
    modalOpen,
    closeModal,
    deleteDoctor,
    redirectToCreateADoctor,
  } = useDoctor();

  return (
    <div className="w-full h-full flex flex-col gap-y-2 p-4">
      {/* Contenedor Button y buscador */}
      <h1 className="p-0 font-medium text-lg">Doctores</h1>
      <div className="w-full flex justify-between items-center gap-x-4 border-2 border-gray-300 rounded-md p-2 bg-gray-50">
        {/* Button */}
        <button
          type="button"
          onClick={redirectToCreateADoctor}
          className="w-44 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Registrar doctor
        </button>

        {/* Buscador */}
        <div className="sm:w-full lg:w-[30%]">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          ></label>
          <input
            type="text"
            onChange={filterDoctors}
            placeholder="Ingresa un nombre"
            className="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      {/* Contendor table */}
      <div className="overflow-x-auto w-full max-h-full flex flex-grow justify-center border-2 bg-gray-50 border-gray-300 rounded-md py-2">
        <Table hoverable className="">
          <Table.Head className="w-full">
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Cédula</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Especialidad</Table.HeadCell>
            <Table.HeadCell>Teléfono</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {filteredDoctors.length > 0
              ? filteredDoctors.map((e) => {
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
                      <Table.Cell>{e.especialidad}</Table.Cell>
                      <Table.Cell>{e.numeroTelefono}</Table.Cell>
                      <Table.Cell className="flex gap-x-2">
                        <Link to={`/administrador/modificar_doctor/${e.id}`}>
                          <button
                            type="button"
                            className="w-20  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          >
                            Editar
                          </button>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            modalOpen(e.id);
                          }}
                          className="w-24  text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          Eliminar
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              : doctors.map((e) => {
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
                      <Table.Cell>{e.especialidad}</Table.Cell>
                      <Table.Cell>{e.numeroTelefono}</Table.Cell>
                      <Table.Cell className="flex gap-x-2">
                        <Link to={`/administrador/modificar_doctor/${e.id}`}>
                          <button
                            type="button"
                            className="w-20  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          >
                            Editar
                          </button>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            modalOpen(e.id);
                          }}
                          className="w-24  text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          Eliminar
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
          </Table.Body>
        </Table>
        <MyModal
          closeModal={closeModal}
          deleteUser={deleteDoctor}
          openModal={openModal}
          title="¿Está seguro de eliminar el usuario?"
          textButton="Eliminar"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default DoctorPage;
