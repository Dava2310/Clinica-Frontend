import React, { useEffect, useState } from "react";
import client from "../../../../../api/client";
import { useForm } from "react-hook-form";
import { toaster } from "../../../../../utils/toaster";
import Alert from "../../../../common/alert/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { arrEspecialidades, nameCookieSessionApp } from "../../../../../config";
import { deleteCookie } from "../../../../../utils/cookies";
import { regexName_lastname } from "../../../../../utils/validators";

type Inputs = {
  name: string;
  lastname: string;
  cedula: string;
  email: string;
  numero_telefono: string;
  especialidad: string;
};

const ModifyDoctor = () => {
  const [errorP, setErrorP] = useState<string | undefined>();
  const apiClient = client();
  const { ToastContainer, messageToast } = toaster();
  const params = useParams();
  const navigate = useNavigate();

  console.log(params.userId);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("nombre", data.name);
    formData.append("apellido", data.lastname);
    formData.append("cedula", data.cedula);
    formData.append("email", data.email);
    formData.append("especialidad", data.especialidad);
    formData.append("numeroTelefono", data.numero_telefono);

    try {
      const res = await apiClient.patch(
        `/api/doctores/${params.userId}`,
        formData
      );
      if (res.status === 200) {
        messageToast({
          message: res.data.body.message,
          position: "bottom-right",
          theme: "colored",
          type: "success",
        });
        setErrorP("");
        setTimeout(() => {
          navigate("/administrador/ver_doctores");
        }, 3000);
      }
    } catch (err) {
      const message = err?.response.data.body.message;
      setErrorP(message);
      //Redireccionamos por no estar autenticado
      if (err?.response?.data.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  });

  const fetchDoctor = async () => {
    try {
      const res = await apiClient.get(`api/doctores/${params.userId}`);
      if (res.status === 200) {
        const dataDoctor = { ...res?.data.body.data };
        setValue("name", dataDoctor.nombre);
        setValue("lastname", dataDoctor.apellido);
        setValue("cedula", dataDoctor.cedula);
        setValue("email", dataDoctor.email);
        setValue("especialidad", dataDoctor.especialidad);
        setValue("numero_telefono", dataDoctor.numeroTelefono);
      }
    } catch (error) {
      //Redireccionamos por no estar autenticado
      if (error?.response?.data.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }

      if (error.response.data.statusCode === 404) {
        messageToast({
          message: error.response.data.body.message,
          position: "bottom-right",
          theme: "colored",
          type: "error",
        });

        setTimeout(() => {
          navigate("/administrador/ver_doctores");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchDoctor();
    };
    fetch();
  }, []);

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
                  {...register("name", {
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                    pattern: {
                      value: /^[A-Za-z ]+$/,
                      message: "El nombre no cumple con el formato requerido.",
                    },
                  })}
                />
                {errors?.name && (
                  <span className=" w-full text-red-500 text-sm">
                    {errors.name?.message}
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
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "El apellido es requerido",
                    },
                    pattern: {
                      value: /^[A-Za-z ]+$/,
                      message:
                        "El apellido no cumple con el formato requerido.",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.lastname && (
                  <span className=" w-full text-red-500 text-sm">
                    {errors.lastname?.message}
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
                      value: /^\d{8}$/,
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
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
            </div>
          </div>

          {/* Container datos de doctor */}
          <div className="w-full mt-4 flex flex-col gap-y-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900s">
                Datos del Doctor:
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 sm:flex-col lg:flex-row">
              {/* especialidad */}
              <div className="sm:w-full lg:w-[45%]">
                <label
                  htmlFor="especialidad"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Especialidad
                </label>
                <select
                  {...register("especialidad", {
                    required: {
                      value: true,
                      message: "La especialidad es requerida",
                    },
                    pattern: {
                      value: regexName_lastname,
                      message:
                        "La especialidad no cumple con el formato requerido.",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Seleccione una especialidad:</option>
                  {arrEspecialidades.map((t) => {
                    return (
                      <option key={t.type} value={t.type}>
                        {t.type}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* numero de telefono */}
              <div className="sm:w-full lg:w-[45%]">
                <label
                  htmlFor="numero_telefono"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Número de teléfono:
                </label>
                <input
                  type="text"
                  placeholder="04241234567"
                  {...register("numero_telefono", {
                    required: {
                      value: true,
                      message: "El número es requerido",
                    },
                    pattern: {
                      value: /^\d{11}$/,
                      message: "El número no cumple con el formato requerido.",
                    },
                    min: {
                      value: 11,
                      message: "El número debe tener minimo 11 dígitos",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.numero_telefono && (
                  <span className=" w-full text-red-500 text-sm">
                    {errors.numero_telefono?.message}
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

export default ModifyDoctor;
