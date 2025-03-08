import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { deleteCookie } from "../../../utils/cookies";
import { toaster } from "../../../utils/toaster";
import { nameCookieSessionApp } from "../../../config";
import client from "../../../api/client";

import { ApiError } from "../interfaces/errorsApiInterface";
import { DoctorDto } from "../interfaces/doctorsInterfaces";

const useUpdateDoctor = () => {
 const [errorP, setErrorP] = useState<string>("");
  const apiClient = client();
  const { messageToast } = toaster();
  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DoctorDto>();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("apellido", data.apellido);
    formData.append("cedula", data.cedula);
    formData.append("email", data.email);
    formData.append("especialidad", data.especialidad);
    formData.append("numeroTelefono", data.numeroTelefono);

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
      const error = err as ApiError;
      const message = error?.response?.data?.body?.message as string;
      setErrorP(message);

      //Redireccionamos por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  });

  const fetchDoctor = async () => {
    try {
      const res = await apiClient.get(`/api/doctores/${params.userId}`);
      if (res.status === 200) {
        const dataDoctor = { ...res?.data.body.data };
        setValue("nombre", dataDoctor.nombre);
        setValue("apellido", dataDoctor.apellido);
        setValue("cedula", dataDoctor.cedula);
        setValue("email", dataDoctor.email);
        setValue("especialidad", dataDoctor.especialidad);
        setValue("numeroTelefono", dataDoctor.numeroTelefono);
      }
    } catch (err) {
      const error = err as ApiError;
      //Redireccionamos por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }

      if (error?.response?.data?.statusCode === 404) {
        messageToast({
          message: error?.response.data.body?.message as string,
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

  return {
    //refs
    errorP,
    errors,

    //actions
    register,
    onSubmit
  }
}

export default useUpdateDoctor;