import axios from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

// Request interceptors
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      return Promise.reject(new Error("Error"));
    } else {
      return response.data;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
