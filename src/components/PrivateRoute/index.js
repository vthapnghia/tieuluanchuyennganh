import { Navigate, useLocation } from "react-router-dom";
import { KEY_STORAGE } from "../../contanst/global";
import PATH from "../../contanst/path";
import { useAuth } from "../../until/hooks";

function PrivateRoute({ children, isPrivate, ...rest }) {
  const { userAuth } = useAuth();
  const location = useLocation();

  if (!userAuth && isPrivate) {
    localStorage.setItem(KEY_STORAGE.OLD_PATH, location.pathname);
    return <Navigate to={PATH.LOGIN} state={{ from: location }} />;
  }
  return children;
}

export default PrivateRoute;
