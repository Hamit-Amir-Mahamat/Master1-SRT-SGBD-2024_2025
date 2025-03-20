import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem("token")}`, // 👈 Ajoute bien ce token
  },
});

export default api;

