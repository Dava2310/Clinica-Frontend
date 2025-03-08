import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../../api/client";
import { toaster } from "../../../utils/toaster";
import { AdminResponse } from "../interfaces/adminInterfaces";
import { ApiError } from "../interfaces/errorsApiInterface";

const useAdmins = () => {
  const [admins, setAdmins] = useState<AdminResponse[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<AdminResponse[]>([]);
  const [adminABorrar, setAdminABorrar] = useState<number | null>(null);
  const navigate = useNavigate();
  const apiClient = client();
  const { messageToast } = toaster();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await apiClient.get("/api/users/tipo/administrador");
      if (res.status === 200) {
        setAdmins(res.data.body.data);
      }
    } catch (error) {
      const err = error as ApiError;
      if (err.response?.data?.statusCode === 401) {
        navigate("/login");
      }
    }
  };

  const filterAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param = e.target.value.toLowerCase().replace(/\s+/g, "");
    setFilteredAdmins(
      admins.filter((admin) =>
        `${admin.nombre} ${admin.apellido}`.toLowerCase().replace(/\s+/g, "").includes(param)
      )
    );
  };

  const deleteUser = async () => {
    if (!adminABorrar) return;
    try {
      const res = await apiClient.get(`/api/users/${adminABorrar}`);
      if (res.data.body.data.id) {
        const resDelete = await apiClient.del(`/api/users/${res.data.body.data.id}`);
        if (resDelete.status === 200) {
          messageToast({
            message: resDelete.data.body.message,
            position: "bottom-right",
            theme: "colored",
            type: "success",
          });
          setAdmins(admins.filter((e) => e.id !== adminABorrar));
          setAdminABorrar(null);
        }
      }
    } catch (error) {
    const err = error as ApiError;
      const errorMsg = err?.response?.data?.body?.message || "Error al eliminar el administrador";
      
      messageToast({
        message: errorMsg,
        position: "bottom-right",
        theme: "colored",
        type: "error",
      });
      
      if (err?.response?.data?.statusCode === 401) {
        navigate("/login");
      }
    }
  };

  return {
    admins,
    filteredAdmins,
    filterAdmin,
    deleteUser,
    setAdminABorrar,
  };
};

export default useAdmins;
