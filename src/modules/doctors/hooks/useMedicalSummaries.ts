import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { deleteCookie } from '../../../utils/cookies';
import { nameCookieSessionApp } from '../../../config';;

import client from '../../../api/client';
import { ApiError } from '../../common/interfaces/errorsApiInterface';
import { MedicalSummaryResponse } from '../interfaces/summaryInterfaces';

const useMedicalSummaries = () => {
  //States
  const [summaries, setSummaries] = useState<MedicalSummaryResponse[]>([]);

  //Instances
  const apiClient = client();
  const navigate = useNavigate();
  const params = useParams();

  //Functions

  const fetchSummaries = async () => {
    try {
      const res = await apiClient.get(`/api/resumenes/paciente/${params.pacienteId}`);
      if (res?.data.body.data !== undefined) {
        setSummaries(res.data.body.data);
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
      await fetchSummaries();
    };

    fetch();
  }, []);

  return {
   summaries,
   params
  }
}

export default useMedicalSummaries