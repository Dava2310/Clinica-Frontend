import { ToastContainer } from "react-toastify";
import {
  regexDigits,
  regexEmail,
  regexName_lastname,
} from "../../../utils/validators";

import Alert from "../../common/alert/Alert";
import useCreateAdmin from "../hook/useCreateAdmin";

const CreateAdminPage = () => {
  const { errorP, errors, onSubmit, register } = useCreateAdmin();

  return (
    // Container
    <>
      {errorP && <Alert message={errorP} type={"error"} />}

      <div className="w-full h-full p-4">
        {/* Formulario */}
        <form
          action=""
          onSubmit={onSubmit}
          className="border-2 border-gray-300 rounded-md p-4 bg-gray-50 h-full overflow-hidden"
        >
          {/* Container datos personales */}
          <div className="w-full flex flex-col gap-y-3 ">
            <div>
              <h2 className="text-xl font-semibold text-gray-900s">
                Datos Personales:
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 sm:flex-col lg:flex-row">
              {/* name */}
              <div className="sm:w-full lg:w-[30%]">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu nombre:
                </label>
                <input
                  type="text"
                  placeholder="Manuel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("nombre", {
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                    pattern: {
                      value: regexName_lastname,
                      message: "El nombre no cumple con el formato requerido.",
                    },
                  })}
                />
                {errors?.nombre && (
                  <span className=" w-full text-red-500 text-sm">
                    {errors.nombre?.message}
                  </span>
                )}
              </div>
              {/* apellido */}
              <div className="sm:w-full lg:w-[30%]">
                <label
                  htmlFor="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu apellido:
                </label>
                <input
                  type="text"
                  placeholder="Blanco"
                  {...register("apellido", {
                    required: {
                      value: true,
                      message: "El apellido es requerido",
                    },
                    pattern: {
                      value: regexName_lastname,
                      message:
                        "El apellido no cumple con el formato requerido.",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.apellido && (
                  <span className=" w-full text-red-500 text-sm">
                    {errors.apellido?.message}
                  </span>
                )}
              </div>
              {/* cedula */}
              <div className="sm:w-full lg:w-[30%]">
                <label
                  htmlFor="cedula"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu cédula:
                </label>
                <input
                  type="text"
                  placeholder="25987320"
                  {...register("cedula", {
                    required: {
                      value: true,
                      message: "La cédula es requerida",
                    },
                    pattern: {
                      value: regexDigits,
                      message: "La cédula no cumple con el formato requerido.",
                    },
                    min: {
                      value: 8,
                      message: "La cédula debe tener minimo 8 dígitos",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.cedula && (
                  <span className=" w-full text-red-500 text-sm">
                    {errors.cedula?.message}
                  </span>
                )}
              </div>
              {/* email */}
              <div className="sm:w-full lg:w-[45%]">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu correo electrónico
                </label>
                <input
                  type="email"
                  placeholder="micorreo@gmail.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El correo electrónico es requerido",
                    },
                    pattern: {
                      value: regexEmail,
                      message: "El correo no cumple con el formato requerido.",
                    },
                  })}
                />
                {errors?.email && (
                  <span className=" w-full text-red-500 text-sm">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              {/* password */}
              <div className="sm:w-full lg:w-[45%]">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="********"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "La contraseña es requerida",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      message:
                        "El contraseña no cumple con el formato requerido.",
                    },
                    min: 8,
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.password && (
                  <span className=" w-full text-red-500 text-sm">
                    {errors.password?.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Container Button */}
          <div className="w-full flex justify-center mt-6">
            <button
              type="submit"
              className="w-[25%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Guardar
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreateAdminPage;
