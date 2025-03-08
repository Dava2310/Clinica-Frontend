import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../../api/client";
import { toaster } from "../../../utils/toaster";
import { PatientDto } from "../interfaces/patientInterfaces";
import { useForm } from "react-hook-form";
import { ApiError } from "../interfaces/errorsApiInterface";
import { nameCookieSessionApp } from "../../../config";
import { deleteCookie } from "../../../utils/cookies";

const useCreatePatient = () => {
  const [errorP, setErrorP] = useState<string>('');
  const apiClient = client();
  const { messageToast } = toaster();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientDto>();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("apellido", data.apellido);
    formData.append("cedula", data.cedula);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("numeroTelefono", data.numeroTelefono);
    formData.append("tipoSangre", data.tipoSangre);
    formData.append("direccion", data.direccion);
    formData.append("seguroMedico", data.seguroMedico);
    formData.append("tipoUsuario", "paciente");

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
      setErrorP(error.response?.data?.body?.message as string);

      //Redireccionamos por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  });

  return {
    //refs
    errorP,
    errors,

    //actions
    onSubmit,
    register
  }
}

export default useCreatePatient;