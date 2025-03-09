import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteCookie, getCookie } from "../../../utils/cookies";
import { nameCookieSessionApp } from "../../../config";
import { PropsToken } from "../../../types";

import client from "../../../api/client";
import { ApiError } from "../../common/interfaces/errorsApiInterface";
import { AppointmentResponse } from "../../administrator/interfaces/appointmentInterfaces";

const useAppointment = () => {
      //States
  const [appointment, setAppointment] = useState<AppointmentResponse[]>([]);
  const [filteredAppointment, setFilteredAppointment] = useState<
    AppointmentResponse[]
  >([]);
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
      setFilteredAppointment(appointment);
      return;
    }

    const searchTerm = name.toLowerCase();
    const filteredCita = appointment.filter(
      (c) =>
        c.paciente.usuario.nombre.toLowerCase().includes(searchTerm) ||
        c.paciente.usuario.apellido.toLowerCase().includes(searchTerm)
    );
    setFilteredAppointment(filteredCita);
  };

  const filterScheduledAppointments = (arr: AppointmentResponse[]) => {
    return arr.filter((c) => c.estado === "Programada");
  };

  const fetchAppointment = async () => {
    const token = getCookie(nameCookieSessionApp) as PropsToken;

    try {
      const res = await apiClient.get(`/api/doctores/usuario/${token?.id}`);
      if (!res.data.body.data) return;

      const resCitas = await apiClient.get(`/api/citas/doctor/${token.id}`);
      setAppointment(filterScheduledAppointments(resCitas?.data.body.data));
    } catch (err) {
      const error = err as ApiError;

      //Redireccionamos por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchAppointment();
    };

    fetch();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [appointment, name]);

  return {
    //refs
    filteredAppointment,

    //actions
    onHandleChange,
    filterScheduledAppointments,

  }
}
export default useAppointment;