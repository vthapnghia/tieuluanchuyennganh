import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbars from "./components/Navbars";
import Blog from "./features/User/pages/Blog";
import Cart from "./features/User/pages/Cart";
import Contact from "./features/User/pages/Contact";
import Home from "./features/User/pages/Home";
import Shop from "./features/User/pages/Products";
import Login from './features/Authentication/page/Login/index';
import PATH from "./contanst/path";
import routes from "./routes";
import ProductDetail from "./features/User/Components/ProductDetail";

function App() {
  return (
    <div className="App">
      <Navbars />
      {/* <HeroSection /> */}
      <Routes>
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.PRODUCT.LIST_PRODUCT} element={<Shop />} />
        <Route path={PATH.PRODUCT.DETAIL_PRODUCT} element={<ProductDetail />} />
        {/* <Route path={PATH.} element={<Blog />} />
        <Route path={PATH.} element={<Contact />} /> */}
        <Route path={PATH.CART} element={<Cart />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        {/* {
          routes.map((route, index) => {
            <Route path={route.path} element={route.component} />
          })
        } */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
