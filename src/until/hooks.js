import { useSelector } from "react-redux";
import { KEY_STORAGE } from "../contanst/global";
import { getJsonObject } from "./common";

const useAuth = () => {
  const { user } = useSelector((state) => state.auth);
  let is_admin = false;
  let userAuth = null;
  if (!user) {
    const localUser = getJsonObject(KEY_STORAGE.CP_USER);
    is_admin = localUser?.is_admin ?? false;
    userAuth = localUser || null;
  } else {
    is_admin = user?.is_admin ?? false;
    userAuth = user || null;
  }
  return { userAuth, is_admin };
};

export { useAuth };
