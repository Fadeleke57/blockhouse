import axios from "axios";
import { environment } from "@/environment/load_env";

const api = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-cg-demo-api-key": environment.coin_gecko_api_key,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default api;
