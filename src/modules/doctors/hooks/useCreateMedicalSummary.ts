import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { formatDate } from "../../../utils/utilidades";
import { toaster } from "../../../utils/toaster";
import { deleteCookie } from "../../../utils/cookies";
import { nameCookieSessionApp } from "../../../config";
import client from "../../../api/client";

import { AppointmentResponse } from "../../administrator/interfaces/appointmentInterfaces";
import { ApiError } from "../../administrator/interfaces/errorsApiInterface";
import { MedicalSummaryDto } from "../interfaces/summaryInterfaces";

const useCreateMedicalSummary = () => {
  //States
  const [appointment, setAppointment] = useState<AppointmentResponse>();
  const [errorP, setErrorP] = useState<string>('');
   //Instances
  const apiClient = client();
  const navigate = useNavigate();
  const { messageToast } = toaster();
  const params = useParams();
 
  const {
    register,
    handleSubmit,
    formState: { errors },
   } = useForm<MedicalSummaryDto>();

  

  //Funciones
  const fetchAppointments = async () => {
    const apiClient = client();
    const params = useParams();
    const navigate = useNavigate();
    
    try {
      const res = await apiClient.get(`/api/citas/opciones/${params.citaId}`);
      if (res.status === 200) setAppointment(res.data.body.data);
    } catch (err) {
      const error = err as ApiError;

      //Redireccionar por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  }

  const onSubmit = handleSubmit(async (data: MedicalSummaryDto) => {
    const formData = new FormData();
    formData.append("diagnostico", data.diagnostico);
    formData.append("tratamiento", data.tratamiento);
    formData.append("observaciones", data.observaciones);
    formData.append("tipoServicio", appointment?.tipoServicio as string);
    formData.append("citaId", `${params.citaId as string}`);
    formData.append("fecha", formatDate(new Date()));

    try {
      const res = await apiClient.post(`/api/resumenes/`, formData);
      console.log(res);
      if (res.data.status == 201) {
        messageToast({
          message: res.data.body.message,
          position: "bottom-right",
          theme: "colored",
          type: "success",
        });

        setTimeout(() => {
          navigate("/doctor/ver_citas");
        }, 2000);
      }
    } catch (err) {
      const error = err as ApiError;

      //Redireccionar por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  });

   //UseEffect
    useEffect(() => {
      const fetch = async () => {
        await fetchAppointments();
      };
  
      fetch();
    }, [])

  return{
    //refs
    errors,
    errorP,
    appointment,

    //actions
    onSubmit,
    register

  }
};

export default useCreateMedicalSummary;