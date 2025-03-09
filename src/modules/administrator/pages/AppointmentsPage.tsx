import { ToastContainer } from "react-toastify";
import Tabs from "../../common/tabs";
import MyModal from "../../common/alert/Modal";
import RequestedAppointments from "../components/RequestedAppointments";
import PendingAppointments from "../components/PendingAppointments";
import ScheduledAppointments from "../components/ScheduledAppointments";
import useAppointments from "../hook/useAppointments";
import { PanelEnum } from "../interfaces/appointmentInterfaces";

const AppointmentsPage = () => {
  const {
    panel,
    filteredAppointment,
    openModal,
    closeModal,
    modalOpen,
    togglePanel,
    deleteAppointment,
  } = useAppointments();
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
