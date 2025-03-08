import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toaster } from "../../../utils/toaster";
import { deleteCookie } from "../../../utils/cookies";
import { nameCookieSessionApp } from "../../../config";

import client from "../../../api/client";
import Tabs from "../../common/tabs";

import MyModal from "../../common/alert/Modal";
import { ApiError } from "../interfaces/errorsApiInterface";
import RequestedAppointments from "../components/RequestedAppointments";
import PendingAppointments from "../components/PendingAppointments";
import ScheduledAppointments from "../components/ScheduledAppointments";
import { AppointmentResponse } from "../interfaces/appointmentInterfaces";

enum PanelEnum {
  Solicitadas = 1,
  EnProceso = 2,
  Programadas = 3,
}

const AppointmentsPage = () => {
  //States
  const [appointment, setAppointment] = useState<AppointmentResponse[]>([]);
  const [filteredAppointment, setFilteredAppointment] = useState<
    AppointmentResponse[]
  >([]);
  const [panel, setPanel] = useState<PanelEnum>(1);
  const [AppointmentDelete, setAppointmentDelete] = useState<number>();
  const [openModal, setOpenModal] = useState(false);
  //Intances
  const navigate = useNavigate();
  const apiClient = client();
  const { ToastContainer, messageToast } = toaster();

  const togglePanel = (p: number) => {
    setPanel(p);
  };

  const modalOpen = (e: number) => {
    //Seteamos el doctor a borrar
    setAppointmentDelete(e);
    //Abrimos el modal
    setOpenModal(true);
  };

  const closeModal = () => {
    //Limpiamos el estado del doctor a borrar
    setAppointmentDelete(undefined);
    //Cerramos el modal
    setOpenModal(false);
  };

  const filterAppointment = () => {
    const estadoMap = {
      1: "Solicitada",
      2: "Opciones",
      3: "Programada",
    };

    const estado = estadoMap[panel];
    if (estado) {
      const filtered = appointment.filter((e) => e.estado === estado);
      setFilteredAppointment(filtered);
    }
  };

  const deleteAppointment = async () => {
    try {
      const res = await apiClient.get(
        `/api/citas/cancelar/${AppointmentDelete}`
      );

      if (res.status === 200) {
        messageToast({
          message: res.data.body.message,
          position: "bottom-right",
          theme: "colored",
          type: "success",
        });

        //Eliminamos el doctor borrado del estado
        const d = appointment.filter((e) => e.id !== AppointmentDelete);
        setAppointment(d);

        //Limpiamos el estado del doctor a borrar
        setAppointmentDelete(undefined);
        closeModal();
      }
    } catch (err) {
      //Redireccionamos por no estar autenticado
      const error = err as ApiError;
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  };

  const fetchAppointment = async () => {
    try {
      const res = await apiClient.get("/api/citas/");
      if (res.status === 200) {
        if (res.data.body.data.length === 0) {
          messageToast({
            message: res.data.body.message,
            position: "bottom-right",
            theme: "colored",
            type: "info",
          });
        }
        setAppointment(res.data.body.data);
      }
    } catch (err) {
      const error = err as ApiError;
      //Redireccionamos por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }

      if (error?.response?.data?.statusCode == 404) {
        navigate("/error");
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
    filterAppointment();
  }, [panel, appointment]);

  return (
    <>
      <Tabs panel={panel} setPanel={togglePanel} />

      <div className="w-full h-full flex flex-col gap-y-4 p-4">
        <div className="bg-gray-50 rounded-md">
          {panel === PanelEnum.Solicitadas && (
            <RequestedAppointments
              filteredAppointment={filteredAppointment}
              modalOpen={modalOpen}
            />
          )}

          {panel === PanelEnum.EnProceso && (
            <PendingAppointments
              filteredAppointment={filteredAppointment}
              modalOpen={modalOpen}
            />
          )}

          {panel === PanelEnum.Programadas && (
            <ScheduledAppointments
              filteredAppointment={filteredAppointment}
              modalOpen={modalOpen}
            />
          )}

          <MyModal
            closeModal={closeModal}
            deleteUser={deleteAppointment}
            openModal={openModal}
            title="¿Está seguro de cancelar la cita?"
            textButton="Cancelar"
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AppointmentsPage;
