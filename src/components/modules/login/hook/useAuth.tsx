import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

import client from "../../../../api/client";
import { setCookie } from "../../../../utils/cookies";
import { nameCookieSessionApp, prefixUrlsTypeUsers } from "../../../../config";
import { AuthInputs } from "../interfaces/AuthInterfaces";

export const useLogin = () => {
  const [errorP, setErrorP] = useState<string | undefined>();
  const navigate = useNavigate();
  const apiClient = client();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const res = await apiClient.post("/api/auth/login", formData);
      setCookie(
        nameCookieSessionApp,
        JSON.stringify(res.data.body.data),
        1000000
      );

      const correspondingModule = prefixUrlsTypeUsers.find(
        (e) => e.type === res.data.body.data.tipoUsuario
      );

      setErrorP("");
      navigate(`${correspondingModule?.url || "/"}`);
    } catch (error) {
      const errorAxios = error as AxiosError;
      const message =
        (errorAxios.response?.data as any)?.body?.message ||
        "Ha ocurrido un error";
      setErrorP(message);
    }
  });

  return { register, errors, onSubmit, errorP };
};
