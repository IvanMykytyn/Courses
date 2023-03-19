import axios from "axios";
import { BASE_URL } from "src/constants/api";
import { getFromLocalStorage } from "src/helpers/localStorage";

const privateApi = axios.create({
  baseURL: BASE_URL,
});

privateApi.interceptors.request.use((config:any) => {
  const apiToken = getFromLocalStorage("token");
 
  return {
    ...config,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    }
  };
});

export default privateApi;
