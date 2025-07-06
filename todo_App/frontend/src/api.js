import axios from 'axios';

const API = axios.create({
  baseURL: "https://todo-appapi.vercel.app/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  console.log("tokne =>", token);
  if (token) {
   req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;