import axios from "axios";

export const CallApi = () => {
  const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;
  const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      "x-apihub-key": REACT_APP_API_KEY,
      "x-apihub-host": "Translate.allthingsdev.co",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.error("Error fetching exchange rate:", err);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      console.error("Error fetching exchange rate:", err);
    }
  );
  return axiosInstance;
};
