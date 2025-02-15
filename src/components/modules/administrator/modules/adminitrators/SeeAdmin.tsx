import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import client from "../../../../../api/client";
import MyModal from "../../../../common/alert/Modal";
import { toaster } from "../../../../../utils/toaster";

type Admin = {
  id: number;
  userId: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
};
const SeeAdmin = () => {
  // States
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [AdminABorrar, setAdminABorrar] = useState<number>();

  const navigate = useNavigate();
  const apiClient = client();
  const { ToastContainer, messageToast } = toaster();

  const filterAdmin = (e) => {
    const param = e.target.value;

    let filter = admins.filter((admin) => {
      const doc = `${admin.nombre} ${admin.apellido}`;
      return doc
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(param.toLowerCase().split(" ").join(""));
    });

    if (e.target.value === "") filter = [];

    setFilteredAdmins(filter);
  };

  const redirecToCreateAAdmin = () =>
    navigate("/administrador/crear_administrador");

  const modalOpen = (e) => {
    //Seteamos el doctor a borrar
    setAdminABorrar(e);
    //Abrimos el modal
    setOpenModal(true);
  };

  const closeModal = () => {
    //Limpiamos el estado del doctor a borrar
    setAdminABorrar(undefined);
    //Cerramos el modal
    setOpenModal(false);
  };

  const fetchAdmins = async () => {
    try {
      const res = await apiClient.get("/api/users/tipo/administrador");
      if (res.status === 200) {
        setAdmins(res.data.body.data);
      }
    } catch (error) {
      //Redireccionamos por no estar autenticado
      if (error?.response?.data.statusCode === 401) {
        navigate("/login");
      }
    }
  };

  const deleteUser = async () => {
    try {
      const res = await apiClient.get(`/api/users/${AdminABorrar}`);
      if (res?.data?.body?.data?.id != undefined) {
        const resDelete = await apiClient.del(
          `/api/users/${res?.data?.body.data.id}`
        );
        if (resDelete.status === 200) {
          messageToast({
            message: resDelete.data.body.message,
            position: "bottom-right",
            theme: "colored",
            type: "success",
          });
          //Eliminamos el doctor borrado del estado
          const d = admins.filter((e) => e.id !== AdminABorrar);
          setAdmins(d);
          //Limpiamos el estado del doctor a borrar
          setAdminABorrar(undefined);
          closeModal();
        }
      }
    } catch (error) {
      if (error?.response?.data.statusCode === 403) {
        return messageToast({
          message: error?.response?.data.body.message,
          position: "bottom-right",
          theme: "colored",
          type: "error",
        });
      }

      if (error?.response?.data.statusCode === 500) {
        return messageToast({
          message: "Error al eliminar el administrador",
          position: "bottom-right",
          theme: "colored",
          type: "error",
        });
      }
      //Redireccionamos por no estar autenticado
      if (error?.response?.data.statusCode === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchAdmins();
    };
    fetch();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-y-4 p-4">
      {/* Contenedor Button y buscador */}
      <div className="w-full flex justify-between items-center gap-x-4 border-2 border-gray-300 rounded-md p-2 bg-gray-50">
        {/* Button */}
        <button
          type="button"
          onClick={redirecToCreateAAdmin}
          className="w-48 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Registrar Administrador
        </button>

        {/* Buscador */}
        <div className="sm:w-full lg:w-[30%]">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          ></label>
          <input
            type="text"
            onChange={filterAdmin}
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
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {filteredAdmins.length > 0
              ? filteredAdmins.map((e) => {
                  return (
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
              : admins.map((e) => {
                  return (
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
                        <Link
                          to={`/administrador/modificar_administrador/${e.id}`}
                        >
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
          deleteUser={deleteUser}
          openModal={openModal}
          title="¿Está seguro de eliminar el usuario?"
          textButton="Eliminar"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SeeAdmin;
