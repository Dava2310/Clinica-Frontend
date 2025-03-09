import useMedicalSummary from "../hooks/useMedicalSummary";

const MedicalSummaryPage = () => {
  const { summary } = useMedicalSummary();

  return (
    <>
      <div className="w-full h-full p-4">
        <div className="border-2 border-gray-300 rounded-md p-4 mb-4 bg-gray-50 h-fit flex justify-between">
          {/* Paciente */}
          <div className="sm:w-full lg:w-[30%]">
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Paciente:
            </label>
            <input
              id="paciente"
              disabled
              type="text"
              placeholder=""
              value={`${
                summary
                  ? `${summary.paciente.usuario.nombre} ${summary.paciente.usuario.apellido} - ${summary.paciente.usuario.cedula}`
                  : ""
              }`}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* Tipo de servicio */}
          <div className="sm:w-full lg:w-[30%]">
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de servicio:
            </label>
            <input
              disabled
              type="text"
              placeholder=""
              value={`${summary?.tipoServicio}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        {/* Formulario */}
        <form
          action=""
          className="border-2 border-gray-300 rounded-md p-4 bg-gray-50 overflow-hidden"
        >
          {/* Container datos personales */}
          <div className="w-full flex flex-col gap-y-3 ">
            <div>
              <h2 className="text-xl font-semibold text-gray-900s">
                Datos del resumen:
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 sm:flex-col lg:flex-row">
              {/* diagnostico */}
              <div className="sm:w-full lg:w-[45%]">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Diagnostico:
                </label>
                <input
                  type="text"
                  disabled
                  placeholder=""
                  value={`${summary?.diagnostico}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* tratamiento */}
              <div className="sm:w-full lg:w-[45%]">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tratamiento:
                </label>
                <input
                  type="text"
                  disabled
                  placeholder=""
                  value={`${summary?.tratamiento}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* Observaciones */}
              <div className="sm:w-full lg:w-[45%]">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Observaciones:
                </label>
                <textarea
                  disabled
                  value={summary?.observaciones}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-32"
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MedicalSummaryPage;
