import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbars from "./components/Navbars";
import Blog from "./features/User/pages/Blog";
import Cart from "./features/User/pages/Cart";
import Contact from "./features/User/pages/Contact";
import Home from "./features/User/pages/Home";
import Shop from "./features/User/pages/Products";
import Login from "./features/Authentication/page/Login/index";
import PATH from "./contanst/path";
import routes from "./routes";
import ProductDetail from "./features/User/Components/ProductDetail";
import Admin from "./features/Admin";
import NotFound from "./components/NotFound";
import Profile from "./features/User/pages/Profile";
import SideBar from "./features/Admin/component/Sidebar";
import NavbarAdmin from "./features/Admin/component/NavbarAdmin/index";

function App() {
  const { pathname } = useLocation();
  const is_superuser = true;
  return (
    <div className="App">
      {is_superuser ? (
        <div className="d-flex flex-row w-100 h-100">
          <div className="sidebar-left" id="sidebar-left">
            <SideBar />
          </div>
          <div className="content-right d-flex flex-column">
            <div>
              <NavbarAdmin />
            </div>
            <div className="page"></div>
          </div>
        </div>
      ) : (
        <>
          <Navbars />
          {pathname !== PATH.LOGIN ? <HeroSection /> : <></>}
          <Routes>
            <Route path={PATH.HOME} element={<Home />} />
            <Route path={PATH.PRODUCT.LIST_PRODUCT} element={<Shop />} />
            <Route
              path={PATH.PRODUCT.DETAIL_PRODUCT}
              element={<ProductDetail />}
            />
            {/* <Route path={PATH.} element={<Blog />} />
        <Route path={PATH.} element={<Contact />} /> */}
            <Route path={PATH.CART} element={<Cart />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.NOT_FOUND} element={<NotFound />} />
            <Route path={PATH.PROFILE} element={<Profile />} />
            {/* {
          routes.map((route, index) => {
            <Route path={route.path} element={route.component} />
          })
        } */}
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
