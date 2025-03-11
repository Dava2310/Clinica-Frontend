import { ToastContainer } from "react-toastify";
import Tabs from "../../common/components/Tabs";
import MyModal from "../../common/components/Modal";
import { PanelEnum } from "../interfaces/appointmentInterfaces";
import document from "../../../assets/document.png";
import useAppointments from "../../patients/hooks/useAppointments";
import AppointmentTable from "../../common/components/AppointmentTable";

const estadoMap = {
  1: "Solicitada",
  2: "Opciones",
  3: "Programada",
};
const AppointmentsPage = () => {
  const {
    panel,
    filteredAppointments,
    isModalOpen,
    openModal,
    closeModal,
    togglePanel,
    deleteAppointment,
  } = useAppointments({
    fetchEndpoint: () => "/api/citas/",
    statusMap: estadoMap,
    deleteEndpoint: (id: number) => `api/citas/cancelar/${id}`,
  });
  return (
    <>
      <Tabs panel={panel} setPanel={togglePanel} />

      <div className="w-full full flex flex-col gap-y-4 p-4 mt-3">
        <div className="rounded-md">
          {filteredAppointments.length ? (
            <>
              {panel === PanelEnum.Solicitadas && (
                <AppointmentTable
                  isDisplayed={true}
                  labelOk="Programar"
                  labelCancel="Cancelar"
                  cancelable={true}
                  rows={filteredAppointments}
                  modalOpen={openModal}
                  viewPath="administrador/programar_cita"
                  columns={[
                    { title: "Paciente", accessor: "paciente.usuario.nombre" },
                    { title: "Servicio", accessor: "tipoServicio" },
                    { title: "Especialidad", accessor: "especialidad" },
                    { title: "Status", accessor: "estado" },
                  ]}
                />
              )}

              {panel === PanelEnum.EnProceso && (
                <AppointmentTable
                  isDisplayed={true}
                  labelOk="Ver cita"
                  labelCancel="Cancelar cita"
                  cancelable={true}
                  rows={filteredAppointments}
                  modalOpen={openModal}
                  viewPath="administrador/ver_cita"
                  columns={[
                    { title: "Paciente", accessor: "paciente.usuario.nombre" },
                    { title: "Servicio", accessor: "tipoServicio" },
                    { title: "Especialidad", accessor: "especialidad" },
                    { title: "Status", accessor: "estado" },
                  ]}
                />
              )}

              {panel === PanelEnum.Programadas && (
                <AppointmentTable
                  isDisplayed={true}
                  labelOk="Ver cita"
                  labelCancel="Cancelar cita"
                  cancelable={true}
                  rows={filteredAppointments}
                  modalOpen={openModal}
                  viewPath="administrador/ver_cita/"
                  columns={[
                    { title: "Paciente", accessor: "paciente.usuario.nombre" },
                    { title: "Servicio", accessor: "tipoServicio" },
                    { title: "Especialidad", accessor: "especialidad" },
                    { title: "Status", accessor: "estado" },
                    { title: "Fecha", accessor: "fecha" },
                  ]}
                />
              )}

              <MyModal
                closeModal={closeModal}
                deleteUser={deleteAppointment}
                openModal={isModalOpen}
                title="¿Está seguro de cancelar la cita?"
                textButton="Aceptar"
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
