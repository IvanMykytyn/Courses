
import publicApi from "src/configs/publicApi";
import type { IAuthResponse } from "./types";

export const getAuthToken = async (): Promise<IAuthResponse> => {
  return publicApi
    .get("/auth/anonymous?platform=subscriptions")
    .then((res) => res.data);
};

