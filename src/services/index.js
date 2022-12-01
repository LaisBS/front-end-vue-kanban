import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@Solomon:token");

  if (token) {
    config.headers.authorization = `bearer ${token}`;
  }

  return config;
});

export default api;
