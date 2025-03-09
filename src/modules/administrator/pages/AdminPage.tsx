import { Link, useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import { toaster } from "../../../utils/toaster";
import MyModal from "../../common/alert/Modal";
import useAdmins from "../hook/useAdmin";
import useModal from "../hook/useModal";

const AdminPage = () => {
  const { admins, filteredAdmins, filterAdmin, deleteUser, setAdminABorrar } =
    useAdmins();
  const { openModal, open, close } = useModal();
  const navigate = useNavigate();
  const { ToastContainer } = toaster();

  return (
    <div className="w-full h-full flex flex-col gap-y-2 p-4">
      <h1 className="p-0 font-medium text-lg">Administradores</h1>
      <div className="w-full flex justify-between items-center gap-x-4 border-2 border-gray-300 rounded-md p-2 bg-gray-50">
        <button
          type="button"
          onClick={() => navigate("/administrador/crear_administrador")}
          className="w-48 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Registrar Administrador
        </button>

        <div className="sm:w-full lg:w-[30%]">
          <input
            type="text"
            onChange={filterAdmin}
            placeholder="Ingresa un nombre"
            className="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
      </div>

      <div className="overflow-x-auto w-full max-h-full flex flex-grow justify-center border-2 bg-gray-50 border-gray-300 rounded-md py-2">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Cédula</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {(filteredAdmins.length > 0 ? filteredAdmins : admins).map((e) => (
              <Table.Row
                key={e.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {e.nombre} {e.apellido}
                </Table.Cell>
                <Table.Cell>{e.cedula}</Table.Cell>
                <Table.Cell>{e.email}</Table.Cell>
                <Table.Cell className="flex gap-x-2">
                  <Link to={`/administrador/modificar_administrador/${e.id}`}>
                    <button className="w-20 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Editar
                    </button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminABorrar(e.id);
                      open();
                    }}
                    className="w-24 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Eliminar
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <MyModal
        closeModal={close}
        deleteUser={deleteUser}
        openModal={openModal}
        title="¿Está seguro de eliminar el usuario?"
        textButton="Eliminar"
      />
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
