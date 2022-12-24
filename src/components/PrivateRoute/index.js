import { Navigate, useLocation } from "react-router-dom";
import PATH from "../../contanst/path";
import { useAuth } from "../../until/hooks";

function PrivateRoute({ children, isPrivate, ...rest }) {
  const { userAuth } = useAuth();
  const location = useLocation();

  if (!userAuth && isPrivate) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }} />;
  }
  return children;
}

export default PrivateRoute;
