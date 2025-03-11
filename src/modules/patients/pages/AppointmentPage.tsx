import { ToastContainer } from "react-toastify";
import Tabs from "../../common/components/Tabs";
import MyModal from "../../common/components/Modal";
import { PanelEnum } from "../../administrator/interfaces/appointmentInterfaces";
import document from "../../../assets/document.png";
import useAppointments from "../../patients/hooks/useAppointments";
import AppointmentTable from "../../common/components/AppointmentTable";
import { getCookie } from "../../../utils/cookies";
import { nameCookieSessionApp } from "../../../config";
import { PropsToken } from "../../../types";

const estadoMap = {
  1: "Solicitada",
  2: "Opciones",
  3: "Programada",
};
const AppointmentsPage = () => {
  const token = getCookie(nameCookieSessionApp) as PropsToken;

  const {
    panel,
    filteredAppointments,
    isModalOpen,
    openModal,
    closeModal,
    togglePanel,
    deleteAppointment,
  } = useAppointments({
    id: token.id,
    fetchEndpoint: (id) => `/api/citas/paciente/${id}`,
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
                  isDisplayed={false}
                  labelOk="Ver"
                  labelCancel="Cancelar"
                  cancelable={true}
                  rows={filteredAppointments}
                  modalOpen={openModal}
                  viewPath="paciente/ver_cita"
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
                  labelOk="Aprobar"
                  labelCancel="Cancelar"
                  cancelable={true}
                  viewPath="paciente/aprobar_cita"
                  modalOpen={openModal}
                  columns={[
                    { title: "Paciente", accessor: "paciente.usuario.nombre" },
                    { title: "Servicio", accessor: "tipoServicio" },
                    { title: "Especialidad", accessor: "especialidad" },
                    { title: "Status", accessor: "estado" },
                  ]}
                  rows={filteredAppointments}
                />
              )}

              {panel === PanelEnum.Programadas && (
                <AppointmentTable
                  isDisplayed={true}
                  labelOk="Ver"
                  labelCancel="Cancelar"
                  cancelable={false}
                  rows={filteredAppointments}
                  modalOpen={openModal}
                  viewPath="paciente/ver_cita"
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

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { toaster } from "../../../utils/toaster";
// import { deleteCookie, getCookie } from "../../../utils/cookies";
// import { nameCookieSessionApp } from "../../../config";
// import client from "../../../api/client";
// import { PropsToken } from "../../../types";

// import MyModal from "../../common/alert/Modal";
// import TableCitasSolicitadas from "./TableCitasSolicitadas";
// import TableCitasProgramadas from "./TableCitasProgramadas";
// import Tabs from "../../../common/tabs";
// import TableCitasEnProceso from "./TableCitasEnProceso";
// import { AppointmentResponse } from "../../administrator/interfaces/appointmentInterfaces";

// const AppointmentPage = () => {
//   //States
//   const [citas, setCitas] = useState<AppointmentResponse[]>([]);
//   const [filteredCitas, setFilteredCitas] = useState<Appo[]>([]);
//   const [panel, setPanel] = useState<number>(1);
//   const [citaABorrar, setCitaABorrar] = useState<number>();
//   const [openModal, setOpenModal] = useState(false);
//   const [token, setToken] = useState<PropsToken>();
//   //Intances
//   const navigate = useNavigate();
//   const apiClient = client();
//   const { ToastContainer, messageToast } = toaster();

//   const togglePanel = (p: number) => {
//     setPanel(p);
//   };

//   const modalOpen = (e: number) => {
//     //Seteamos el doctor a borrar
//     setCitaABorrar(e);
//     //Abrimos el modal
//     setOpenModal(true);
//   };

//   const closeModal = () => {
//     //Limpiamos el estado del doctor a borrar
//     setCitaABorrar(undefined);
//     //Cerramos el modal
//     setOpenModal(false);
//   };

//   const filterCitas = () => {
//     if (panel === 1) {
//       const c = citas.filter((e) => e.estado === "Solicitada");
//       setFilteredCitas(c);
//     }

//     if (panel === 2) {
//       const c = citas.filter((e) => e.estado === "Opciones");
//       setFilteredCitas(c);
//     }

//     if (panel === 3) {
//       const c = citas.filter((e) => e.estado === "Programada");
//       setFilteredCitas(c);
//     }
//   };

//   const deleteCita = async () => {
//     try {
//       const res = await apiClient.get(`/api/citas/cancelar/${citaABorrar}`);
//       if (res.status === 200) {
//         messageToast({
//           message: res.data.body.message,
//           position: "bottom-right",
//           theme: "colored",
//           type: "success",
//         });

//         //Eliminamos el doctor borrado del estado
//         const d = citas.filter((e) => e.id !== citaABorrar);
//         setCitas(d);
//         //Limpiamos el estado del doctor a borrar
//         setCitaABorrar(undefined);
//         closeModal();
//       }
//     } catch (error) {
//       //Redireccionamos por no estar autenticado
//       if (error?.response?.data.statusCode === 401) {
//         deleteCookie(nameCookieSessionApp);
//         navigate("/login");
//       }
//     }
//   };

//   const fetchCitas = async () => {
//     try {
//       const res = await apiClient.get(`/api/citas/paciente/${token?.id}`);
//       console.log(res);
//       if (res.status === 200) {
//         setCitas(res.data.body.data);
//       }
//     } catch (error) {
//       console.log(error);
//       //Redireccionamos por no estar autenticado
//       if (error?.response?.data.statusCode === 401) {
//         deleteCookie(nameCookieSessionApp);
//         navigate("/login");
//       }

//       if (error?.response?.status == 404) {
//         //
//       }
//     }
//   };

//   useEffect(() => {
//     const t: PropsToken = getCookie(nameCookieSessionApp);
//     if (t !== undefined) {
//       setToken(t);
//     }
//   }, []);

//   useEffect(() => {
//     if (token !== undefined) {
//       const fetch = async () => {
//         await fetchCitas();
//       };

//       fetch();
//     }
//   }, [token]);

//   useEffect(() => {
//     filterCitas();
//   }, [panel, citas]);

//   return (
//     <>
//       <Tabs panel={panel} setPanel={togglePanel} />

//       <div className="w-full h-full flex flex-col gap-y-4 p-4">
//         <div className="bg-gray-50 rounded-md">
//           {panel === 1 && (
//             <TableCitasSolicitadas
//               filteredCitas={filteredCitas}
//               modalOpen={modalOpen}
//             />
//           )}

//           {panel === 2 && (
//             <TableCitasEnProceso
//               filteredCitas={filteredCitas}
//               modalOpen={modalOpen}
//             />
//           )}

//           {panel === 3 && (
//             <TableCitasProgramadas
//               filteredCitas={filteredCitas}
//               modalOpen={modalOpen}
//             />
//           )}
//           <MyModal
//             closeModal={closeModal}
//             deleteUser={deleteCita}
//             openModal={openModal}
//             title="¿Está seguro de cancelar la cita?"
//             textButton="Sí"
//           />
//         </div>
//         <ToastContainer />
//       </div>
//     </>
//   );
// };

// export default AppointmentPage;
