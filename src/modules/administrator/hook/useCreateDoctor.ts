import { useState } from "react";
import client from "../../../api/client";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../../utils/toaster";
import { DoctorDto } from "../interfaces/doctorsInterfaces";
import { useForm } from "react-hook-form";
import { ApiError } from "../interfaces/errorsApiInterface";
import { nameCookieSessionApp } from "../../../config";
import { deleteCookie } from "../../../utils/cookies";

const useCreateDoctor = () => {
  const [errorP, setErrorP] = useState<string>("");
  const apiClient = client();
  const navigate = useNavigate();
  const {  messageToast } = toaster();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoctorDto>();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("apellido", data.apellido);
    formData.append("cedula", data.cedula);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("especialidad", data.especialidad);
    formData.append("numeroTelefono", data.numeroTelefono);
    formData.append("tipoUsuario", "doctor");

    try {
      const res = await apiClient.post("/api/auth/register", formData);

      if (res.status === 201) {
        reset();
        messageToast({
          message: res.data.body.message,
          position: "bottom-right",
          theme: "colored",
          type: "success",
        });
        setErrorP("");
      }
    } catch (err) {
      const error = err as ApiError;

      //Redireccionar por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }

      const message = error?.response?.data?.body?.message as string;
      setErrorP(message);
    }
  });

  return {
    //refs
    errorP,
    errors,
    //actions
    register,
    onSubmit
  }
}

export default useCreateDoctor;

