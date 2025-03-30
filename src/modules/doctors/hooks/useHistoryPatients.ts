import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteCookie } from "../../../utils/cookies";
import { nameCookieSessionApp } from "../../../config";

import { ApiError } from "../../common/interfaces/errorsApiInterface";
import { HistoryPatientResponse } from "../interfaces/historyPatientsInterfaces";

import client from "../../../api/client";

const useHistoryPatients = () => {
    //States
  const [histories, setHistories] = useState<HistoryPatientResponse>();

  //Intances
  const apiClient = client();
  const navigate = useNavigate();

  //Functions
  const fetchHistories = async () => {
    try {
      const res = await apiClient.get(`/api/historiales/`);
      if (res.data.body.data) setHistories(res.data.body.data);
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

  useEffect(() => {
    const fetch = async () => {
      await fetchHistories();
    };

    fetch();
  }, []);

  return { histories };
}

export default useHistoryPatients