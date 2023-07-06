import { Navigate, useLocation } from "react-router-dom";
import PATH from "../../constants/path";
import { useAuth } from "../../until/hooks";

function PrivateRoute({ children, isPrivate, ...rest }) {
  const { userAuth, is_admin, is_seller } = useAuth();
  const location = useLocation();
  if (!userAuth && isPrivate) {
    return <Navigate to={PATH.NOT_FOUND} state={{ from: location }} />;
  }
  if (is_admin || is_seller) {
    return <Navigate to={PATH.NOT_FOUND} state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
