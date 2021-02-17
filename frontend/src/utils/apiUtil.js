import axios from "axios";
import history from "./historyUtil";

export const Api = (contentType = "application/json") => {
  const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
  const header = {
    "Content-Type": contentType,
    accept: "application/json",
  };

  const config = {
    withCredentials: true,
    header: header,
    baseURL: BASE_URL,
    responseType: "json",
  };
  const api = axios.create(config);

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      console.log(err.response.data)
      return Promise.reject(err.response.data);
    }
  );

  return api;
};
