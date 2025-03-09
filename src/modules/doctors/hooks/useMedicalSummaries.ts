import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { deleteCookie, getCookie } from '../../../utils/cookies';
import { nameCookieSessionApp } from '../../../config';
import { PropsToken } from '../../../types';

import client from '../../../api/client';
import { ApiError } from '../../administrator/interfaces/errorsApiInterface';
import { HistoryPatientResponse } from '../interfaces/historyPatientsInterfaces';

const useMedicalSummaries = () => {
  //States
  const [histories, setHistories] = useState<HistoryPatientResponse[]>([]);
  const [namePatient, setNamePatient] = useState<string>("");
  const [historiesFilter, setHistoriesFilter] = useState<
    HistoryPatientResponse[]
  >([]);

  //Instances
  const apiClient = client();
  const navigate = useNavigate();

  //Functions
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamePatient(e.target.value);
  };

  const filterToPatient = () => {
    if (namePatient === "") return setHistoriesFilter(histories);

    const filter = histories.filter((h) =>
      h.paciente.usuario.nombre
        .toLowerCase()
        .includes(namePatient.toLowerCase())
    );

    setHistoriesFilter(filter);
  };

  const filterHistoriesWithMedicalSummary = (arr: HistoryPatientResponse[]) => {
    const token = getCookie(nameCookieSessionApp) as PropsToken;
    return arr
      .filter((h) => h.resumenesMedicos.length > 0)
      .filter((h) =>
        h.resumenesMedicos.filter(
          (r) => Number(r.doctor.userId) === Number(token.id)
        )
      );
  };

  const fetchHistories = async () => {
    try {
      const res = await apiClient.get(`/api/historiales/`);
      if (res?.data.body.data !== undefined) {
        setHistories(filterHistoriesWithMedicalSummary(res.data.body.data));
      }
    } catch (error) {
      const handleError = (error: ApiError) => {
        if (error?.response?.data?.statusCode === 401) {
          deleteCookie(nameCookieSessionApp);
          navigate("/login");
        }
      };

      handleError(error as ApiError);
    }
  };

  //Effects
  useEffect(() => {
    const fetch = async () => {
      await fetchHistories();
    };

    fetch();
  }, []);

  useEffect(() => {
    if (histories.length > 0) {
      filterToPatient();
    }
  }, [histories, namePatient]);

  return {
    histories,
    namePatient,
    historiesFilter,
    onHandleChange,
  }
}

export default useMedicalSummaries