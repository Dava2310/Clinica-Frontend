import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";

import { deleteCookie } from "../../../utils/cookies";

import { arrEspecialidades, nameCookieSessionApp } from "../../../config";
import client from "../../../api/client";
import { DoctorResponse } from "../interfaces/doctorsInterfaces";
import { ApiError } from "../interfaces/errorsApiInterface";

type PropsSelectDoctor = {
  setDoctor: (e: number) => void;
  doctor: number | undefined;
};

const SeleccionarDoctor = ({ setDoctor, doctor }: PropsSelectDoctor) => {
  // States
  const [doctors, setDoctors] = useState<DoctorResponse[]>([]);
  const [especialidad, setEspecialidad] = useState<string>("");
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorResponse[]>([]);

  const navigate = useNavigate();
  const apiClient = client();

  //Functions
  const onSelectedEspecialidad = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const param = e.target.value;

    if (param !== "") {
      const filter = doctors.filter((doctor) => {
        return doctor.especialidad.toLowerCase().includes(param.toLowerCase());
      });

      console.log(filter);
      setEspecialidad(param);

      setFilteredDoctors(filter);
    }
  };

  const filterDoctors = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param = e.target.value;

    let filter = [] as DoctorResponse[];

    if (especialidad !== "") {
      filter = doctors.filter((doctor) => {
        return doctor.especialidad
          .toLowerCase()
          .includes(especialidad.toLowerCase());
      });
    }

    filter = doctors.filter((doctor) => {
      const doc = `${doctor.nombre} ${doctor.apellido}`;
      return doc
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(param.toLowerCase().split(" ").join(""));
    });

    if (e.target.value === "") filter = [];

    setFilteredDoctors(filter);
  };

  const fetchDoctors = async () => {
    try {
      const res = await apiClient.get("/api/doctores/");
      if (res.status === 200) {
        setDoctors(res.data.body.data);
      }
    } catch (err) {
      const error = err as ApiError;
      //Redireccionamos por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  };

  const selectedDoctor = (doctorId: number) => {
    setDoctor(doctorId);
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchDoctors();
    };
    fetch();
  }, []);

  return (
    <>
      {/* Contenedor Button y buscador */}
      <div className="w-full flex justify-between items-center gap-x-4 border-2 border-gray-300 rounded-md p-2 bg-gray-50">
        {/* especialidad */}
        <div className="sm:w-full lg:w-[45%]">
          <label
            htmlFor="tipoSangre"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Especialidad
          </label>
          <select
            onChange={onSelectedEspecialidad}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Seleccione una especialidad:</option>
            {arrEspecialidades.map((t) => {
              return (
                <option key={t.type} value={t.type}>
                  {t.type}
                </option>
              );
            })}
          </select>
        </div>

        {/* Buscador */}
        <div className="sm:w-full lg:w-[30%]">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Filtrar por nombre:
          </label>
          <input
            type="text"
            onChange={filterDoctors}
            placeholder="Ingresa un nombre"
            className="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      {/* Contendor table */}
      <div className="overflow-x-auto w-full max-h-full flex  justify-center border-2 bg-gray-50 border-gray-300 rounded-md py-2">
        <Table hoverable className="w-full">
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
            {filteredDoctors.length > 0 &&
              filteredDoctors.map((e) => {
                return (
                  <Table.Row
                    key={e.id}
                    className={`bg-white dark:border-gray-700 dark:bg-gray-800 hover:cursor-pointer`}
                    onClick={() => {
                      selectedDoctor(e.id);
                    }}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {e.nombre} {e.apellido}
                    </Table.Cell>
                    <Table.Cell>{e.cedula}</Table.Cell>
                    <Table.Cell>{e.email}</Table.Cell>
                    <Table.Cell>{e.especialidad}</Table.Cell>
                    <Table.Cell>{e.numeroTelefono}</Table.Cell>
                    <Table.Cell className="text-green-300 h-8 w-8">
                      {e.id === doctor && <FaCheckCircle className="w-6 h-6" />}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default SeleccionarDoctor;
