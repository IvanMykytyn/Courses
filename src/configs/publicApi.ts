import axios from "axios";
import { BASE_URL } from "src/constants/api";

const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default publicApi;
