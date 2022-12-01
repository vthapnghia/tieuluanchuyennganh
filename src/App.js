import { Route, Routes } from "react-router-dom";
import PATH from "./contanst/path";
import Admin from "./features/Admin";
import Login from "./features/Authentication/page/Login/index";
import User from "./features/User";
import Home from "./features/User/pages/Home";
import Products from "./features/User/pages/Products";
import ProductDetail from "./features/User/Components/ProductDetail";
import Cart from "./features/User/pages/Cart";
import NotFound from "./components/NotFound";
import Profile from "./features/User/pages/Profile";
import Blog from "./features/User/pages/Blog";
import PrivateRoute from "./components/PrivateRoute";
import ManagerProducts from "./features/Admin/pages/ManagerProducts";
import Spinner from "./components/Spinner";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route
          path={PATH.ADMIN.BASE}
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route path={PATH.ADMIN.PRODUCTS} element={<ManagerProducts />} />
          <Route path={PATH.ADMIN.BASE} element={<ManagerProducts />} />
        </Route>
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
          <Route path={PATH.BLOG} element={<Blog />} />
        </Route>
        <Route path={PATH.NOT_FOUND} element={<NotFound />} />
      </Routes>
      <Spinner />
    </div>
  );
}

export default App;
