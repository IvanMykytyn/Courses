import { useMutation } from "react-query";
import queryClient from "src/configs/queryClient";
import { addToLocalStorage } from "src/helpers/localStorage";
import { useAuthStore } from "src/store/useAuthStore";
import { getAuthToken } from "./api";
import type { IAuthResponse } from "./types";

export const useAuthTokenMutation = () => {
  const { setIsLogged } = useAuthStore();

  return useMutation<IAuthResponse>({
    mutationKey: ["auth"],
    mutationFn: async () => {
      return getAuthToken().then((data) => {
        return data;
      });
    },
    onSuccess: ({ token }) => {
      addToLocalStorage("token", token);
      setIsLogged(true)

      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  });
};