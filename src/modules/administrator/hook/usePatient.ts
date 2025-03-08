import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteCookie } from "../../../utils/cookies";
import { toaster } from "../../../utils/toaster";
import { nameCookieSessionApp } from "../../../config";
import client from "../../../api/client";

import { ApiError } from "../interfaces/errorsApiInterface";
import { PatientResponse } from "../interfaces/patientInterfaces";

const usePatient = () => {
  // States
  const [patients, setpatients] = useState<PatientResponse[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<PatientResponse[]>(
    []
  );
  const [openModal, setOpenModal] = useState(false);
  const [patientABorrar, setPatientABorrar] = useState<number>();

  const navigate = useNavigate();
  const apiClient = client();
  const { messageToast } = toaster();

  const filterPatients = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param = e.target.value;

    let filter = patients.filter((patient) => {
      const doc = `${patient.nombre} ${patient.apellido}`;
      return doc
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(param.toLowerCase().split(" ").join(""));
    });

    if (e.target.value === "") filter = [];

    setFilteredPatients(filter);
  };

  const redirectToCreateAPatient = () =>
    navigate("/administrador/crear_paciente");

  const modalOpen = (patientId: number) => {
    //Seteamos el doctor a borrar
    setPatientABorrar(patientId);
    //Abrimos el modal
    setOpenModal(true);
  };

  const closeModal = () => {
    //Limpiamos el estado del doctor a borrar
    setPatientABorrar(undefined);
    //Cerramos el modal
    setOpenModal(false);
  };

  const fetchPatients = async () => {
    try {
      const res = await apiClient.get("/api/pacientes/");
      if (res.status === 200) {
        setpatients(res.data.body.data);
      }
    } catch (error) {
      //Redireccionamos por no estar autenticado
      const err = error as ApiError;
      if (err.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  };

  const deletePatient = async () => {
    try {
      const res = await apiClient.get(`/api/pacientes/${patientABorrar}`);
      if (res?.data?.body?.data?.id != undefined) {
        const resDelete = await apiClient.del(
          `/api/pacientes/${res?.data?.body.data.id}`
        );
        if (resDelete.status === 200) {
          messageToast({
            message: resDelete.data.body.message,
            position: "bottom-right",
            theme: "colored",
            type: "success",
          });

          //Eliminamos el doctor borrado del estado
          const d = patients.filter((e) => e.id !== patientABorrar);
          setpatients(d);
          //Limpiamos el estado del doctor a borrar
          setPatientABorrar(undefined);
          closeModal();
        }
      }
    } catch (error) {
      const err = error as ApiError;
      if (err?.response?.data?.statusCode === 500) {
        return messageToast({
          message: "Error al eliminar el paciente",
          position: "bottom-right",
          theme: "colored",
          type: "error",
        });
      }
      //Redireccionamos por no estar autenticado

      if (err.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchPatients();
    };
    fetch();
  }, []);


  return {
    //refs
    patients,
    filteredPatients,
    openModal,
    //actions
    closeModal,
    modalOpen,
    redirectToCreateAPatient,
    filterPatients,
    deletePatient
  }
}

export default usePatient;