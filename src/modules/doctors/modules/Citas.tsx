import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../../../../api/client";
import { deleteCookie, getCookie } from "../../../../utils/cookies";
import { nameCookieSessionApp } from "../../../../config";
import { PropsToken } from "../../../../types";
import { Table } from "flowbite-react";
import { mostrarFecha } from "../../../../utils/utilidades";

interface Opciones {
  fecha: string;
  id: number;
  idCita: number;
  idDoctor: number;
}

interface Doctor {
  id: number;
  especialidad: string;
  numeroTelefono: string;
  userId: number;
  cedula: string;
  nombre: string;
  apellido: string;
  email: string;
  tipoUsuario: string;
}

interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
}

interface Paciente {
  id: number;
  userId: number;
  usuario: Usuario;
  numeroTelefono: string;
}

interface Cita {
  especialidad: string;
  estado: string;
  tipoServicio: string;
  opciones: Opciones[];
  doctor: Doctor;
  paciente: Paciente;
  fecha: string;
  id: number;
}

const Citas = () => {
  //States
  const [citas, setCitas] = useState<Cita[]>([]);
  const [filteredCitas, setFiteredCitas] = useState<Cita[]>([]);
  const [name, setName] = useState<string>("");

  //Instances
  const apiClient = client();
  const navigate = useNavigate();

  //Functions
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleFilterChange = () => {
    if (name === "") {
      setFiteredCitas(citas);
      return;
    }

    const searchTerm = name.toLowerCase();
    const filteredCita = citas.filter(
      (c) =>
        c.paciente.usuario.nombre.toLowerCase().includes(searchTerm) ||
        c.paciente.usuario.apellido.toLowerCase().includes(searchTerm)
    );
    setFiteredCitas(filteredCita);
  };

  const filterCitasProgramadas = (arr: Cita[]) => {
    return arr.filter((c) => c.estado === "Programada");
  };

  const fetchCita = async () => {
    const token: PropsToken = getCookie(nameCookieSessionApp);

    try {
      const res = await apiClient.get(`/api/doctores/usuario/${token.id}`);
      if (res?.data.body.data !== undefined) {
        const resCitas = await apiClient.get(`/api/citas/doctor/${token.id}`);
        setCitas(filterCitasProgramadas(resCitas?.data.body.data));
      }
    } catch (error) {
      console.log(error);
      //Redireccionamos por no estar autenticado
      if (error?.response?.data.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }

      if (error?.response?.status == 404) {
        //
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchCita();
    };

    fetch();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [citas, name]);

  return (
    <div className="w-full h-full flex flex-col gap-y-4 p-4">
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

      {/* Contendor table */}
      <div className="overflow-x-auto w-full max-h-full flex flex-grow justify-center border-2 bg-gray-50 border-gray-300 rounded-md py-2">
        <Table hoverable className="">
          <Table.Head className="w-full">
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Tipo de servicio</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Fecha</Table.HeadCell>
            <Table.HeadCell>Telefono</Table.HeadCell>
            <Table.HeadCell>Correo Electronico</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {filteredCitas.length > 0 &&
              filteredCitas.map((e) => {
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
                    <Table.Cell>{mostrarFecha(e.fecha)}</Table.Cell>
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
    </div>
  );
};

export default Citas;
