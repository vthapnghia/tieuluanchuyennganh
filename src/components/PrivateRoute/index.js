import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../until/hooks";

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.userAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default PrivateRoute;
