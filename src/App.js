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

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={PATH.LOGIN} element={<Login />} />
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
