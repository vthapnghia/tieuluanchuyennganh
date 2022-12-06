import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../until/hooks";

function PrivateRoute({ children, ...rest }) {
  const {userAuth} = useAuth();
  const location = useLocation();

  if (!userAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }else{
    
  }
  return children;
}

export default PrivateRoute;
