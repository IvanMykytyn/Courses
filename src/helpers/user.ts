
import { getFromLocalStorage, removeFromLocalStorage } from "./localStorage";

export const getIsLoggedIn = () => getFromLocalStorage("token");

export const removeUserFromLocalStorage = () => {
  removeFromLocalStorage("token");
};
