import PATH from "./contanst/path";
import { lazy } from "react";

const Home = lazy(() => import("./features/User/pages/Home"));
const Cart = lazy(() => import("./features/User/pages/Cart"));
const Product = lazy(() => import("./features/User/pages/Products"));
const ProductDetail = lazy(() => import("./features/User/Components/ProductDetail"));
const Login = lazy(() => import("./features/Authentication/page/Login"));

var routes = [
  {
    path: PATH.HOME,
    name: "Home",
    component: Home,
    allowed: [],
  },
  {
    path: PATH.CART,
    name: "Cart",
    component: Cart,
    allowed: [],
  },

  {
    path: PATH.PRODUCT.LIST_PRODUCT,
    name: "Product",
    component: Product,
    allowed: [],
  },

  {
    path: PATH.PRODUCT.DETAIL_PRODUCT,
    name: "Product detail",
    component: ProductDetail,
    allowed: [],
  },

  {
    path: PATH.LOGIN,
    name: "Login",
    component: Login,
    allowed: [],
  },
];

export default routes;
