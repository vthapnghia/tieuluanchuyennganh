import { Route, Routes } from "react-router-dom";
import PATH from "./contanst/path";
import Login from "./features/Authentication/page/Login/index";
import User from "./features/User";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Spinner from "./components/Spinner";
import { routesAdmin, routesUser } from "./routes";
import AdminRoute from "./components/AdminRoute";
import Admin from "./features/Admin";
import { Suspense } from "react";
import VerifyRegister from "./features/Authentication/page/VerifyRegister";
import ResetPassword from "./features/Authentication/page/ResetPassword";
import Verify from "./features/Authentication/page/ResetPassword/Verify";
import AdminLogin from "./features/Authentication/page/AdminLogin";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.ADMIN.LOGIN} element={<AdminLogin />} />
        <Route path={PATH.VERIFY_REGISTER} element={<VerifyRegister />} />
        <Route path={PATH.RESET_PASSWORD.BASE} element={<ResetPassword />} />
        <Route
          path={PATH.RESET_PASSWORD.RESET_PASSWORD_VERIFY}
          element={<Verify />}
        />
        {routesAdmin.map((routeItem, index) => {
          return (
            <Route
              key={index}
              path={routeItem.path}
              element={
                <Suspense fallback={<></>}>
                  <AdminRoute>
                    <Admin component={routeItem.component} />
                  </AdminRoute>
                </Suspense>
              }
            />
          );
        })}
        {routesUser.map((routeItem, index) => {
          return (
            <Route
              key={index}
              path={routeItem.path}
              element={
                <Suspense fallback={<></>}>
                  <PrivateRoute isPrivate={routeItem.isPrivate}>
                    <User component={routeItem.component} />
                  </PrivateRoute>
                </Suspense>
              }
            />
          );
        })}
        <Route path={PATH.NOT_FOUND} element={<NotFound />} />
      </Routes>
      <Spinner />
    </div>
  );
}

export default App;
