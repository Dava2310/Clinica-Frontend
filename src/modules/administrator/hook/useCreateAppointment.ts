import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import client from "../../../api/client";
import { toaster } from "../../../utils/toaster";
import { formatDate } from "../../../utils/utilidades";
import { ApiError } from "../interfaces/errorsApiInterface";
import { nameCookieSessionApp } from "../../../config";
import { deleteCookie } from "../../../utils/cookies";

interface CustomEventTarget extends EventTarget {
  fecha: {
    value: string;
  };
}

interface SelectDateEvent extends React.FormEvent<HTMLFormElement> {
  target: CustomEventTarget;
}

const useCreateAppointment = () => {
  //States
  const [numberOfDates, setNumberOfDates] = useState<number>(1);
  const [dates, setDates] = useState<string[]>([]);
  const [doctorSelected, setDoctorSelected] = useState<number>();

  //Instances
  const navigate = useNavigate();
  const apiClient = client();
  const params = useParams();
  const { messageToast } = toaster();

  //Functions
  const handleSetNumberOfDates = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setNumberOfDates(Number(e.target.value));

  const setDoctor = (e: number) => setDoctorSelected(e);

  const selectDate = (e: SelectDateEvent): void => {
    e.preventDefault();

    // Verificamos que se haya seleccionado una fecha
    if (e.target.fecha.value === "") return;

    if (dates.length >= numberOfDates) return;

    const dateObj = new Date(e.target.fecha.value);
    const newDate = formatDate(dateObj);

    setDates([...dates, newDate]);
  };

  const onSubmit = async () => {
    const opciones: {
      idCita: number;
      fecha: string;
      idDoctor: number | undefined;
    }[] = [];

    dates.forEach((f) => {
      opciones.push({
        idCita: Number(params.citaId),
        fecha: f,
        idDoctor: doctorSelected,
      });
    });

    try {
      const res = await apiClient.post("/api/citas/opciones/", opciones);
      if (res.status === 201) {
        messageToast({
          message: res.data.body.message,
          position: "bottom-right",
          theme: "colored",
          type: "success",
        });

        setTimeout(() => {
          navigate("/administrador/ver_citas");
        }, 2000);
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
    if (numberOfDates < dates.length) {
      const copyDates = [...dates];
      copyDates.pop();
      setDates(copyDates);
    }
  }, [numberOfDates]);

  return {
    //Refs
    numberOfDates,
    dates,
    doctorSelected,

    //Actions
    onSubmit,
    handleSetNumberOfDates,
    setDoctor,
    selectDate
  }
};
export default useCreateAppointment;