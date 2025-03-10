import useAppointment from "../hooks/useAppointment";

const AppointmentPage = () => {
  const { appointment } = useAppointment();

  return (
    <div className="w-full h-full flex flex-col gap-y-4 p-4">
      <div className="border-2 border-gray-200 bg-gray-50 rounded-md p-4">
        <form action="">
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 sm:flex-col lg:flex-row">
            {/* name */}
            <div className="sm:w-full lg:w-[45%]">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Paciente:
              </label>
              <input
                disabled
                type="text"
                placeholder="Manuel"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={
                  appointment?.paciente.usuario.nombre
                    ? `${appointment?.paciente.usuario.nombre} ${appointment?.paciente.usuario.apellido}`
                    : ""
                }
              />
            </div>

            {/* name */}
            <div className="sm:w-full lg:w-[45%]">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Doctor:
              </label>
              <input
                disabled
                type="text"
                placeholder="Manuel"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={
                  appointment?.doctor.usuario.nombre
                    ? `${appointment?.doctor.usuario.nombre} ${appointment?.doctor.usuario.nombre} ${appointment?.doctor.especialidad}`
                    : ""
                }
              />
            </div>

            {/* name */}
            <div className="sm:w-full lg:w-[45%]">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fecha:
              </label>
              <input
                disabled
                type="text"
                placeholder="Manuel"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={
                  appointment?.fecha
                    ? `${appointment?.fecha}`
                    : "En espera de asignación"
                }
              />
            </div>

            {/* name */}
            <div className="sm:w-full lg:w-[45%]">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tipo de servicio:
              </label>
              <input
                disabled
                type="text"
                placeholder="Manuel"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={
                  appointment?.tipoServicio
                    ? `${appointment?.tipoServicio}`
                    : ""
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentPage;
