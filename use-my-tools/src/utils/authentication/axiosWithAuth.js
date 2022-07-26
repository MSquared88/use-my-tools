import axios from "axios";
import { BASE_URL } from "../baseURL";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      token: token,
    },
  });
};

export default axiosWithAuth;
