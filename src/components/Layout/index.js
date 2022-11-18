import { Route, Routes } from "react-router-dom";
import Footer from "../Footer";
import HeroSection from "../HeroSection";
import Navbars from "../Navbars";
import Home from './../../features/User/pages/Home/index';
import Products from './../../features/Admin/pages/Products';
import ProductDetail from "../../features/User/Components/ProductDetail";
import NotFound from "../NotFound";
import Profile from "../../features/User/pages/Profile";
import PATH from "../../contanst/path";
import Cart from "../../features/User/pages/Cart";

function Layout(params) {
  return (
    <>
      <Navbars />
      {/* <HeroSection /> */}
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.PRODUCT.LIST_PRODUCT} element={<Products />} />
        <Route path={PATH.PRODUCT.DETAIL_PRODUCT} element={<ProductDetail />} />
        <Route path={PATH.CART} element={<Cart />} />
        <Route path={PATH.NOT_FOUND} element={<NotFound />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
      </Routes>
{/* 
      <Footer /> */}
    </>
  );
}

export default Layout;
