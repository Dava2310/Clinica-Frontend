import { ToastContainer } from "react-toastify";
import Tabs from "../../common/components/Tabs";
import MyModal from "../../common/components/Modal";
import RequestedAppointments from "../components/RequestedAppointments";
import PendingAppointments from "../components/PendingAppointments";
import ScheduledAppointments from "../components/ScheduledAppointments";
import useAppointments from "../hook/useAppointments";
import { PanelEnum } from "../interfaces/appointmentInterfaces";
import document from "../../../assets/document.png";

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

      <div className="w-full full flex flex-col gap-y-4 p-4 mt-3">
        <div className="rounded-md">
          {filteredAppointment.length ? (
            <>
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
            </>
          ) : (
            <div className="flex justify-center items-end rounded-md">
              <div className="grid justify-center items-center">
                <div className="flex justify-center">
                  <img src={document} alt="citas" />
                </div>
                <p className="text-md text-center font-medium">
                  No hay registros de citas
                </p>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AppointmentsPage;
