import { useEffect, useState } from "react";
import { DoctorResponse } from "../interfaces/doctorsInterfaces";
import { useNavigate } from "react-router-dom";

import { toaster } from "../../../utils/toaster";
import { deleteCookie } from "../../../utils/cookies";
import { nameCookieSessionApp } from "../../../config";
import client from "../../../api/client";
import { ApiError } from "../interfaces/errorsApiInterface";

const useDoctor = () => {
  // States
  const [doctors, setDoctors] = useState<DoctorResponse[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorResponse[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [doctorABorrar, setDoctorABorrar] = useState<number>();

  const navigate = useNavigate();
  const apiClient = client();
  const { messageToast } = toaster();

  const filterDoctors = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param = e.target.value;

    let filter = doctors.filter((doctor) => {
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

  const redirectToCreateADoctor = () => navigate("/administrador/crear_doctor");

  const modalOpen = (idDoctor:number) => {
    //Seteamos el doctor a borrar
    setDoctorABorrar(idDoctor);
    //Abrimos el modal
    setOpenModal(true);
  };

  const closeModal = () => {
    //Limpiamos el estado del doctor a borrar
    setDoctorABorrar(undefined);
    //Cerramos el modal
    setOpenModal(false);
  };

  const fetchDoctors = async () => {
    try {
      const res = await apiClient.get("/api/doctores/");
      if (res.status === 200) 
        setDoctors(res.data.body.data);
      
    } catch (error) {
        const err = error as ApiError;
      //Redireccionamos por no estar autenticado
      if (err?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  };

  const deleteDoctor = async () => {
    try {
      const res = await apiClient.get(`/api/doctores/${doctorABorrar}`);
      
      if (res.data.body.data.id !== undefined) {
        
        const resDelete = await apiClient.del(
          `/api/doctores/${res?.data?.body.data.id}`
        );

        if (resDelete.status === 200) {
          messageToast({
            message: resDelete.data.body.message,
            position: "bottom-right",
            theme: "colored",
            type: "success",
          });

          //Eliminamos el doctor borrado del estado
          const d = doctors.filter((e) => e.id !== doctorABorrar);
          setDoctors(d);

          //Limpiamos el estado del doctor a borrar
          setDoctorABorrar(undefined);
          closeModal();
        }
      }
    } catch (error) {
      const err = error as ApiError;
      if (err?.response?.data?.statusCode === 500) {
        return messageToast({
          message: "Error al eliminar el doctor",
          position: "bottom-right",
          theme: "colored",
          type: "error",
        });
      }

      //Redireccinar por no estar autenticado
      if (err?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchDoctors();
    };
    fetch();
  }, []);

  return {
    //refs
    doctors,
    filteredDoctors,
    openModal,

    //actions
    filterDoctors,
    redirectToCreateADoctor,
    deleteDoctor,
    modalOpen,
    closeModal

  }
}

export default useDoctor;