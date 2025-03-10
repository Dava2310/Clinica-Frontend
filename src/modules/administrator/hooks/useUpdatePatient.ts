import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { toaster } from "../../../utils/toaster";
import { deleteCookie } from "../../../utils/cookies";
import { nameCookieSessionApp } from "../../../config";
import client from "../../../api/client";

import { ApiError } from "../../common/interfaces/errorsApiInterface";
import { PatientDto, PatientResponse } from "../interfaces/patientInterfaces";

const useUpdatePatient = () => {

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
  } = useForm<PatientDto>();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("apellido", data.apellido);
    formData.append("cedula", data.cedula);
    formData.append("email", data.email);
    formData.append("numeroTelefono", data.numeroTelefono);
    formData.append("tipoSangre", data.tipoSangre);
    formData.append("direccion", data.direccion);
    formData.append("seguroMedico", data.seguroMedico);

    try {
      const res = await apiClient.patch(
        `/api/pacientes/${params.userId}`,
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
          navigate("/administrador/ver_pacientes");
        }, 3000);
      }
    } catch (err) {
      const error = err as ApiError;
      setErrorP(error?.response?.data?.body?.message as string);

      //Redireccionar por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  });

  const fetchPatient = async () => {
    try {
      const res = await apiClient.get(`/api/pacientes/${params.userId}`);
      if (res.status === 200) {
        const dataPaciente = { ...res?.data.body.data };
        setValue("nombre", dataPaciente.nombre);
        setValue("apellido", dataPaciente.apellido);
        setValue("cedula", dataPaciente.cedula);
        setValue("email", dataPaciente.email);
        setValue("seguroMedico", dataPaciente.seguroMedico);
        setValue("direccion", dataPaciente.direccion);
        setValue("tipoSangre", dataPaciente.tipoSangre);
        setValue("numeroTelefono", dataPaciente.numeroTelefono);
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
          navigate("/administrador/ver_pacientes");
        }, 3000);
      }

      //Redireccionamos por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchPatient();
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

export default useUpdatePatient;