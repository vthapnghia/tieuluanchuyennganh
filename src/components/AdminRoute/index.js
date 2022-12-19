import { Navigate, useLocation } from "react-router-dom";
import PATH from "../../contanst/path";
import { useAuth } from "../../until/hooks";

function AdminRoute({ children, ...rest }) {
  const {userAuth, is_admin} = useAuth();
  const location = useLocation();

  if (!userAuth) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }} />;
  }else{
    if(!is_admin){
        return <Navigate to={PATH.NOT_FOUND} state={{ from: location }} />;
    }
  }
  return children;
}

export default AdminRoute;