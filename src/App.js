import { Route, Routes } from "react-router-dom";
import PATH from "./contanst/path";
import Admin from "./features/Admin";
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
import ManagementProduct from "./features/Admin/pages/ManagementProduct";
import ManagementNews from "./features/Admin/pages/ManagementNews";
import ProductDetail from "./features/User/pages/Products/ProductDetail";
import NewDetail from "./features/Admin/pages/ManagementNews/NewsDetail";

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
          <Route path={PATH.ADMIN.PRODUCTS} element={<ManagementProduct />} />
          <Route path={PATH.ADMIN.BASE} element={<ManagementProduct />} />
          <Route path={PATH.ADMIN.NEWS} element={<ManagementNews />} />
          <Route path={PATH.ADMIN.ADD_NEWS} element={<NewDetail />} />
          <Route path={PATH.ADMIN.NEWS_DETAIL} element={<NewDetail />} />
          <Route path={PATH.ADMIN.ADD_NEWS} element={<NewDetail />} />
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
