import axios from "axios";
import { toast } from "react-toastify";
import { AppURl } from "../AppUrl";

const axiosInstance = axios.create({
  baseURL: AppURl,
});


axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : "";
      }
    } catch (error) {
      console.error("Error retrieving token from localStorage", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const method = response?.config?.method?.toUpperCase();
    if (
      method === "POST" ||
      method === "DELETE" ||
      method === "PUT" ||
      method === "PATCH"
    ) {
      toast.success(response?.data?.message, { autoClose: 1000 });
    }

    return response;
  },
  (error) => {
    // console.log(error);
    toast.error(error?.response?.data?.message, { autoClose: 3000 });
    return Promise.reject(error);
  }
);

export default axiosInstance;
