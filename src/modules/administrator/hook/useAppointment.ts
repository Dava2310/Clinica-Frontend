import { useEffect, useState } from "react";
import { AppointmentResponse } from "../interfaces/appointmentInterfaces";
import { useNavigate, useParams } from "react-router-dom";
import client from "../../../api/client";
import { ApiError } from "../interfaces/errorsApiInterface";
import { nameCookieSessionApp } from "../../../config";
import { deleteCookie } from "../../../utils/cookies";

const useAppointment = () => {
//States
  const [appointment, setAppointment] = useState<AppointmentResponse>();

  //Instances
  const params = useParams();
  const apiClient = client();
  const navigate = useNavigate();

  //Functions
  const fetchAppointment = async () => {
    try {
      const res = await apiClient.get(`/api/citas/opciones/${params.citaId}`);
      if (res.status === 200) {
        setAppointment(res.data.body.data);
      }
    } catch (err) {
      const error = err as ApiError;
      //Redireccionamos por no estar autenticado
      if (error?.response?.data?.statusCode === 401) {
        deleteCookie(nameCookieSessionApp);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchAppointment();
    };

    fetch();
  }, []);

  return{
    //refs
    appointment,

    //Actions
    fetchAppointment
  }
}
export default useAppointment;