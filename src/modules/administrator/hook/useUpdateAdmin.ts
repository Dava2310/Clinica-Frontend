import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import client from "../../../api/client";
import { toaster } from "../../../utils/toaster";
import { AdminResponse } from "../interfaces/adminInterfaces";
import { ApiError } from "../../common/interfaces/errorsApiInterface";

const useUpdateAdmin = () => {
  const [errorP, setErrorP] = useState<string>('');
  const apiClient = client();
  const { messageToast } = toaster();
  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AdminResponse>();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("apellido", data.apellido);
    formData.append("cedula", data.cedula);
    formData.append("email", data.email);

    try {
      const res = await apiClient.patch(
        `/api/users/${params.userId}`,
        formData
      );
      if (res.status === 200) {
        reset();
        messageToast({
          message: res.data.body.message,
          position: "bottom-right",
          theme: "colored",
          type: "success",
        });
        setErrorP("");
        setTimeout(() => {
          navigate("/administrador/ver_administradores");
        }, 3000);
      }
    } catch (err) {
      const error = err as ApiError;
      const message = error.response?.data?.body?.message;
      if(message) setErrorP(message);
      //Redireccionamos por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        navigate("/login");
      }
    }
  });

  const fetchAdmin = async () => {
    try {
      const res = await apiClient.get(`/api/users/${params.userId}`);
      if (res.status === 200) {
        const dataAdmin = { ...res?.data.body.data };
        console.log(dataAdmin);
        setValue("nombre", dataAdmin.nombre);
        setValue("apellido", dataAdmin.apellido);
        setValue("cedula", dataAdmin.cedula);
        setValue("email", dataAdmin.email);
      }
    } catch (err) {
        const error = err as ApiError;
      if (error?.response?.data?.statusCode === 404) {
        messageToast({
          message: error?.response?.data?.body?.message!,
          position: "bottom-right",
          theme: "colored",
          type: "error",
        });

        setTimeout(() => {
          navigate("/administrador/ver_administradores");
        }, 3000);
      }

      //Redireccionamos por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchAdmin();
    };
    fetch();
  }, []);

  return {
    //refs
    errorP,
    errors,
    //actions
    onSubmit,
    register
  }
}

export default useUpdateAdmin;