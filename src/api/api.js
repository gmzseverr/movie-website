import axios from "axios";

const BASE_URL = "https://i-movie-spring.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default api;
