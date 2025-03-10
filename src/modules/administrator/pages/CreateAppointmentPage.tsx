import { ToastContainer } from "react-toastify";
import SeleccionarDoctor from "../components/SelectDoctor";
import useCreateAppointment from "../hooks/useCreateAppointment";

const CreateAppointmentPage = () => {
  const {
    dates,
    doctorSelected,
    numberOfDates,
    onSubmit,
    handleSetNumberOfDates,
    selectDate,
    setDoctor,
  } = useCreateAppointment();
  return (
    <div className="w-full h-full flex flex-col gap-y-4 p-4">
      {/* Contenedor Button y buscador */}
      <div className="w-full flex justify-between items-center gap-x-4 border-2 border-gray-300 rounded-md p-2 bg-gray-50">
        {/* Buscador */}
        <form action="" className="w-2/4">
          <div className="sm:w-full lg:w-1/4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cantidad fechas:
            </label>
            <input
              type="number"
              min={1}
              max={3}
              value={numberOfDates}
              onChange={handleSetNumberOfDates}
              placeholder=""
              className="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </form>

        <div>
          <form
            action=""
            onSubmit={selectDate}
            className="flex gap-x-2 cursor-pointer"
          >
            <input type="datetime-local" id="fecha" />
            <button
              className="w-fit text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit"
            >
              Seleccionar
            </button>
          </form>
        </div>
      </div>

      {/* Fechas Seleccionadas */}
      <div className="w-fit flex justify-between items-center gap-x-4 border-2 border-gray-300 rounded-md bg-gray-50">
        <h2 className="font-medium p-2">Fechas seleccionadas:</h2>
        {dates.length > 0 &&
          dates.map((f, i) => {
            return (
              <div key={i} className="border-r-2 border-gary-300 p-2">
                {f}
              </div>
            );
          })}
      </div>

      <SeleccionarDoctor setDoctor={setDoctor} doctor={doctorSelected} />

      {/* Container Button */}
      <div className="w-full flex justify-center mt-2">
        <button
          disabled={
            doctorSelected === undefined || dates.length < numberOfDates
          }
          type="button"
          onClick={onSubmit}
          className="w-[25%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Programar cita
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateAppointmentPage;
