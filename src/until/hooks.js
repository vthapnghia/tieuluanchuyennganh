import { useSelector } from "react-redux";
import { KEY_STORAGE } from "../contanst/global";
import { getJsonObject } from "./common";

const useAuth = () => {
  const { user } = useSelector((state) => state.auth);
  let is_superuser = false;
  let userAuth = null;
  if (!user) {
    const localUser = getJsonObject(KEY_STORAGE.CP_USER);
    is_superuser = localUser?.is_superuser ?? false;
    userAuth = localUser || null;
  } else {
    is_superuser = user?.is_superuser ?? false;
    userAuth = userAuth || null;
  }
  return { userAuth, is_superuser };
};

export { useAuth };
