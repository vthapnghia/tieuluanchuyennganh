import { Route, Routes } from "react-router-dom";
import PATH from "./contanst/path";
import Login from "./features/Authentication/page/Login/index";
import User from "./features/User";
import Home from "./features/User/pages/Home";
import Products from "./features/User/pages/Products";
import Cart from "./features/User/pages/Cart";
import NotFound from "./components/NotFound";
import Profile from "./features/User/pages/Profile";
import News from "./features/User/pages/News";
import PrivateRoute from "./components/PrivateRoute";
import Spinner from "./components/Spinner";
import NewsDetail from "./features/User/pages/News/NewsDetail";
import ProductDetail from "./features/User/pages/Products/ProductDetail";
import { routesAdmin } from "./routes";
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
        <Route path={"/"} element={<User />}>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={PATH.HOME} element={<Home />} />
          <Route path={PATH.PRODUCT.LIST_PRODUCT} element={<Products />} />
          <Route
            path={PATH.PRODUCT.DETAIL_PRODUCT}
            element={<ProductDetail />}
          />
          <Route
            path={PATH.CART}
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path={PATH.PROFILE}
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path={PATH.NEWS.LIST_NEWS} element={<News />} />
          <Route path={PATH.NEWS.DETAIL_NEWS} element={<NewsDetail />} />
        </Route>
        <Route path={PATH.NOT_FOUND} element={<NotFound />} />
      </Routes>
      <Spinner />
    </div>
  );
}

export default App;
