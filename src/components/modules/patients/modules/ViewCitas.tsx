import React, { useEffect, useState } from "react";
import { toaster } from "../../../../utils/toaster";
import client from "../../../../api/client";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table } from "flowbite-react";
import MyModal from "../../../common/alert/Modal";
import TableCitasSolicitadas from "./TableCitasSolicitadas";
import TableCitasProgramadas from "./TableCitasProgramadas";
import Tabs from "../../../common/tabs";
import { PropsToken } from "../../../../types";
import { nameCookieSessionApp } from "../../../../config";
import { deleteCookie, getCookie } from "../../../../utils/cookies";
import TableCitasEnProceso from "./TableCitasEnProceso";

export interface Usuario {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  tipoUsuario: string;
}

export interface Paciente {
  id: number;
  tipoSangre: string;
  direccion: string;
  numeroTelefono: string;
  seguroMedico: string;
  userId: number;
  usuario: Usuario;
}

export interface Citas {
  especialidad: string;
  estado: string;
  fecha: string;
  id: number;
  idDoctor: number;
  idPaciente: number;
  tipoServicio: string;
  paciente: Paciente;
}

const ViewCitas = () => {
  //States
  const [citas, setCitas] = useState<Citas[]>([]);
  const [filteredCitas, setFilteredCitas] = useState<Citas[]>([]);
  const [panel, setPanel] = useState<number>(1);
  const [citaABorrar, setCitaABorrar] = useState<number>();
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState<PropsToken>();
  //Intances
  const navigate = useNavigate();
  const apiClient = client();
  const { ToastContainer, messageToast } = toaster();

  const togglePanel = (p: number) => {
    setPanel(p);
  };

  const modalOpen = (e: number) => {
    //Seteamos el doctor a borrar
    setCitaABorrar(e);
    //Abrimos el modal
    setOpenModal(true);
  };

  const closeModal = () => {
    //Limpiamos el estado del doctor a borrar
    setCitaABorrar(undefined);
    //Cerramos el modal
    setOpenModal(false);
  };

  const filterCitas = () => {
    if (panel === 1) {
      const c = citas.filter((e) => e.estado === "Solicitada");
      setFilteredCitas(c);
    }

    if (panel === 2) {
      const c = citas.filter((e) => e.estado === "Opciones");
      setFilteredCitas(c);
    }

    if (panel === 3) {
      const c = citas.filter((e) => e.estado === "Programada");
      setFilteredCitas(c);
    }
  };

  const deleteCita = async () => {
    try {
      const res = await apiClient.get(`/api/citas/cancelar/${citaABorrar}`);
      if (res.status === 200) {
        messageToast({
          message: res.data.body.message,
          position: "bottom-right",
          theme: "colored",
          type: "success",
        });

        //Eliminamos el doctor borrado del estado
        const d = citas.filter((e) => e.id !== citaABorrar);
        setCitas(d);
        //Limpiamos el estado del doctor a borrar
        setCitaABorrar(undefined);
        closeModal();
      }
    } catch (error) {
      //Redireccionamos por no estar autenticado
      if (error?.response?.data.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  };

  const fetchCitas = async () => {
    try {
      const res = await apiClient.get(`/api/citas//paciente/${token?.id}`);
      console.log(res);
      if (res.status === 200) {
        setCitas(res.data.body.data);
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
    const t: PropsToken = getCookie(nameCookieSessionApp);
    if (t !== undefined) {
      setToken(t);
    }
  }, []);

  useEffect(() => {
    if (token !== undefined) {
      const fetch = async () => {
        await fetchCitas();
      };

      fetch();
    }
  }, [token]);

  useEffect(() => {
    filterCitas();
  }, [panel, citas]);

  return (
    <>
      <Tabs panel={panel} setPanel={togglePanel} />

      <div className="w-full h-full flex flex-col gap-y-4 p-4">
        <div className="bg-gray-50 rounded-md">
          {panel === 1 && (
            <TableCitasSolicitadas
              filteredCitas={filteredCitas}
              modalOpen={modalOpen}
            />
          )}

          {panel === 2 && (
            <TableCitasEnProceso
              filteredCitas={filteredCitas}
              modalOpen={modalOpen}
            />
          )}

          {panel === 3 && (
            <TableCitasProgramadas
              filteredCitas={filteredCitas}
              modalOpen={modalOpen}
            />
          )}
          <MyModal
            closeModal={closeModal}
            deleteUser={deleteCita}
            openModal={openModal}
            title="¿Está seguro de cancelar la cita?"
            textButton="Sí"
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ViewCitas;
