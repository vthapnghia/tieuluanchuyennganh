import { Navigate, useLocation } from "react-router-dom";
import PATH from "../../contanst/path";
import { useAuth } from "../../until/hooks";

function AdminRoute({ children, ...rest }) {
  const {userAuth, is_admin, is_seller} = useAuth();
  const location = useLocation();

  if (!userAuth) {
    return <Navigate to={PATH.ADMIN.LOGIN} state={{ from: location }} />;
  }else{
    if(!is_admin && !is_seller){
        return <Navigate to={PATH.NOT_FOUND} state={{ from: location }} />;
    }
  }
  return children;
}

export default AdminRoute;
