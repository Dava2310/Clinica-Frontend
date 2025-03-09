import React, { useEffect, useState } from 'react'
import client from '../../../api/client';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiError } from '../../common/interfaces/errorsApiInterface';
import { nameCookieSessionApp } from '../../../config';
import { deleteCookie } from '../../../utils/cookies';
import { MedicalSummaryResponse } from '../interfaces/summaryInterfaces';

const useMedicalSummary = () => {
   //States
  const [summary, setSummary] = useState<MedicalSummaryResponse>();

  //Instances
  const apiClient = client();
  const params = useParams();
  const navigate = useNavigate();

  //Functions
  const fetchSummary = async () => {
    try {
      const res = await apiClient.get(`/api/resumenes/${params.resumenId}`);
      if (res.data.body.data) setSummary(res.data.body.data);
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
      await fetchSummary();
    };

    fetch();
  }, []);

  return {
    summary
  }

}

export default useMedicalSummary