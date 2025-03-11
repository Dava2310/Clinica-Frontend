import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import client from "../../../api/client";
import { toaster } from "../../../utils/toaster";
import { deleteCookie } from "../../../utils/cookies";
import { nameCookieSessionApp } from "../../../config";

import { AppointmentResponse } from "../../administrator/interfaces/appointmentInterfaces";
import { ApiError } from "../../common/interfaces/errorsApiInterface";

type UseAppointmentsProps = {
  id?:number;
  fetchEndpoint: (id?:number) => string;
  deleteEndpoint: (id: number) => string;
  statusMap: Record<number, string>;
};

const useAppointments = ({ fetchEndpoint, deleteEndpoint, statusMap, id }: UseAppointmentsProps) => {
  // States
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentResponse[]>([]);
  const [panel, setPanel] = useState<number>(1);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Instances
  const navigate = useNavigate();
  const apiClient = client();
  const { messageToast } = toaster();

  // Functions
  const togglePanel = (p: number) => setPanel(p);

  const openModal = (id: number) => {
    setAppointmentToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setAppointmentToDelete(undefined);
    setIsModalOpen(false);
  };

  const filterAppointments = () => {
    const status = statusMap[panel];
    if (status) {
      setFilteredAppointments(appointments.filter((e) => e.estado === status));
    }
  };

  const deleteAppointment = async () => {
    if (!appointmentToDelete) return;
    try {
      const res = await apiClient.get(deleteEndpoint(appointmentToDelete));
      if (res.status === 200) {
        messageToast({
          message: res.data.body.message,
          position: "bottom-right",
          theme: "colored",
          type: "success",
        });
        
        setAppointments((prev) => prev.filter((e) => e.id !== appointmentToDelete));
        closeModal();
      }
    } catch (err) {
      const error = err as ApiError;
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  };

  const fetchAppointments = async () => {
    const endPoint = id ? fetchEndpoint(id) : fetchEndpoint();

    try {
      const res = await apiClient.get(endPoint);
      if (res.status === 200) {
        setAppointments(res.data.body.data);
      }
    } catch (err) {
      const error = err as ApiError;
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
      if (error?.response?.data?.statusCode === 404) {
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [panel, appointments]);

  return {
    panel,
    filteredAppointments,
    isModalOpen,
    togglePanel,
    closeModal,
    openModal,
    deleteAppointment,
  };
};

export default useAppointments;
