import axios from "axios";

const api = axios.create({
      // baseURL: 'https://api.kocart.online/',
  // baseURL: 'http://localhost:5001',
    baseURL: 'https://kocartserver-9frh.onrender.com',

  withCredentials: true,
});

export default api;
