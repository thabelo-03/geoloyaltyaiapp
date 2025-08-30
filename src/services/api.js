import axios from "axios";

const API = axios.create({ baseURL: "https://syestaguesthouse.co.zw/backendApp/api" });

// Attach token automatically if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
