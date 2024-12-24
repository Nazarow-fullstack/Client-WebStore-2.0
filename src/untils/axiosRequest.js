import { softApi } from "@/config/config";
import axios from "axios"; 

let token = '';

if (typeof window !== 'undefined') {
  token = localStorage.getItem("access_token") || '';
}

const axiosRequest = axios.create({
  baseURL: softApi,
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  },
});

export default axiosRequest;
