import axios from "axios";
import useLocalStorage from "./useLocalStorage";

const useAxiosInstance = () => {
  const { getItem } = useLocalStorage();

  const instance = axios.create({
    baseURL: "http://localhost:3001", // Add your base URL here
  });

  instance.interceptors.request.use(
    (config) => {
      if (getItem("userData")?.token) {
        config.headers.Authorization = getItem("userData")?.token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosInstance;
