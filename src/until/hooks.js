import { useSelector } from "react-redux";
import { KEY_STORAGE } from "../contanst/global";
import { getJsonObject } from "./common";

const useAuth = () => {
  const { user, isAdmin } = useSelector((state) => state.auth);
  let is_admin = false;
  let userAuth = null;
  if (!user) {
    const localUser = getJsonObject(KEY_STORAGE.CP_USER);
    const localAdmin = getJsonObject(KEY_STORAGE.IS_ADMIN);
    is_admin = localAdmin ?? false;
    userAuth = localUser || null;
  } else {
    is_admin = isAdmin ?? false;
    userAuth = user || null;
  }
  return { userAuth, is_admin };
};

export { useAuth };
