import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import client from "../../../api/client";
import { toaster } from "../../../utils/toaster";
import { AdminDto } from "../interfaces/adminInterfaces";
import { ApiError } from "../interfaces/errorsApiInterface";

const useCreateAdmin = () => {
  const [errorP, setErrorP] = useState<string | undefined>();
  const apiClient = client();
  const { messageToast } = toaster();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminDto>();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("apellido", data.apellido);
    formData.append("cedula", data.cedula);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("tipoUsuario", "administrador");

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
        setErrorP(undefined);
      }
    } catch (err) {
      const error = err as ApiError;
      const message = error.response?.data?.body?.message || "Error inesperado";
      setErrorP(message);
      
      if (error.response?.data?.statusCode === 401) {
        navigate("/login");
      }
    }
  });

  return {
    errorP,
    register,
    onSubmit,
    errors,
  };
};

export default useCreateAdmin;