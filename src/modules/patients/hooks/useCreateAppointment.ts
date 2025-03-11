import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { toaster } from '../../../utils/toaster';
import { deleteCookie } from '../../../utils/cookies';
import { nameCookieSessionApp } from '../../../config';
import client from '../../../api/client';

import { AppointmentDto } from '../../administrator/interfaces/appointmentInterfaces';
import { ApiError } from '../../common/interfaces/errorsApiInterface';

const useCreateAppointment = () => {
  //States
  const [errorP, setErrorP] = useState<string>("");

  //Instances
  const apiClient = client();
  const navigate = useNavigate();
  const { messageToast } = toaster();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentDto>();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("especialidad", data.especialidad);
    formData.append("tipoServicio", data.tipoServicio);

    try {
      const res = await apiClient.post("/api/citas/", formData);
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
    } catch (error) {
      const err = error as ApiError;
      setErrorP(err?.response?.data?.body?.message as string);

      //Redireccionamos por no estar autenticado
      if (err?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  });

  return {
    errorP,
    errors,
    register,
    onSubmit
  }
}

export default useCreateAppointment