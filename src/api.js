import axios from "axios";

const api = axios.create({
  // baseURL: 'https://kocartserver.onrender.com',
    baseURL: 'https://api.kollegalakart.online',
  // baseURL: 'http://localhost:5001',
  withCredentials: true,
});

export default api;
