import PATH from "./contanst/path";
import { lazy } from "react";

const ManagementProduct = lazy(() => import("./features/Admin/pages/ManagementProduct"));
const ProductDetailAdmin = lazy(() => import("./features/Admin/pages/ManagementProduct/ProductDetail"));
const ManagementNews = lazy(() => import("./features/Admin/pages/ManagementNews"));
const NewDetail = lazy(() => import("./features/Admin/pages/ManagementNews/NewsDetail"));
const ManagementAcount = lazy(() => import("./features/Admin/pages/ManagementAccount"));
const ManagementBrand = lazy(() => import("./features/Admin/pages/ManagementBrand"));
const Home = lazy(() => import("./features/User/pages/Home"));
const Products = lazy(() => import("./features/User/pages/Products"));
const ProductDetail = lazy(() => import("./features/User/pages/Products/ProductDetail"));
const Cart = lazy(() => import("./features/User/pages/Cart"));
const Profile = lazy(() => import("./features/User/pages/Profile"));
const News = lazy(() => import("./features/User/pages/News"));
const NewsDetail = lazy(() => import("./features/User/pages/News/NewsDetail"));
const Order = lazy (() => import("./features/User/pages/Order"));
const ManagementShip = lazy(() => import("./features/Admin/pages/ManagementShip"));
const UserOrders = lazy(() => import("./features/User/pages/UserOrders"));
const OrdersDetail = lazy(() => import("./features/User/pages/UserOrders/OrderDetail"));
const ManagementOrder = lazy(() => import("./features/Admin/pages/ManagementOrder"));
const OrderDetailAdmin = lazy(() => import("./features/Admin/pages/ManagementOrder/OrderDetail"));
const ManagementVoucher = lazy(() => import("./features/Admin/pages/ManagementVoucher"));
const Revenue  = lazy(() => import("./features/Admin/pages/Revenue"));

const routesAdmin = [
  {
    path: PATH.ADMIN.PRODUCTS.BASE,
    name: "Product base",
    component: ManagementProduct,
  },
  {
    path: PATH.ADMIN.PRODUCTS.PRODUCT_DETAIL,
    name: "Product detail",
    component: ProductDetailAdmin,
  },
  {
    path: PATH.ADMIN.PRODUCTS.ADD_PRODUCT,
    name: "Add product",
    component: ProductDetailAdmin,
  },
  {
    path: PATH.ADMIN.NEWS.BASE,
    name: "News base",
    component: ManagementNews,
  },
  {
    path: PATH.ADMIN.NEWS.NEWS_DETAIL,
    name: "Add details",
    component: NewDetail,
  },
  {
    path: PATH.ADMIN.NEWS.ADD_NEWS,
    name: "Add news",
    component: NewDetail,
  },
  {
    path: PATH.ADMIN.ACCOUNT,
    name: "Account",
    component: ManagementAcount,
  },
  {
    path: PATH.ADMIN.BRAND.BASE,
    name: "Brand base",
    component: ManagementBrand,
  },
  {
    path: PATH.ADMIN.SHIP.BASE,
    name: "Ship base",
    component: ManagementShip,
  },
  {
    path: PATH.ADMIN.ORDER.BASE,
    name: "Order base",
    component: ManagementOrder,
  },
  {
    path: PATH.ADMIN.ORDER.ORDER_DETAIL,
    name: "Order details",
    component: OrderDetailAdmin,
  },
  {
    path: PATH.ADMIN.VOUCHER.BASE,
    name: "Voucher",
    component: ManagementVoucher,
  },
  {
    path: PATH.ADMIN.REVENUE,
    name: "Revenue",
    component: Revenue,
  },
];

const routesUser = [
  {
    path: PATH.BASE,
    name: "Base",
    component: Home,
    isPrivate: false,
  },
  {
    path: PATH.HOME,
    name: "Home",
    component: Home,
    isPrivate: false,
  },
  {
    path: PATH.PRODUCT.LIST_PRODUCT,
    name: "List produt",
    component: Products,
    isPrivate: false,
  },
  {
    path: PATH.PRODUCT.DETAIL_PRODUCT,
    name: "Product detail",
    component: ProductDetail,
    isPrivate: false,
  },
  {
    path: PATH.CART,
    name: "Cart",
    component: Cart,
    isPrivate: true,
  },
  {
    path: PATH.PROFILE,
    name: "Profile",
    component: Profile,
    isPrivate: true,
  },
  {
    path: PATH.NEWS.LIST_NEWS,
    name: "List news",
    component: News,
    isPrivate: false,
  },
  {
    path: PATH.NEWS.DETAIL_NEWS,
    name: "News detail",
    component: NewsDetail,
    isPrivate: false,
  },
  {
    path: PATH.ORDER,
    name: "Order",
    component: Order,
    isPrivate: true,
  },
  {
    path: PATH.USER_ORDERS.BASE,
    name: "Order detail",
    component: UserOrders,
    isPrivate: true,
  },
  {
    path: PATH.USER_ORDERS.ORDER_DETAIL,
    name: "User orders",
    component: OrdersDetail,
    isPrivate: true,
  },
];

export { routesAdmin, routesUser };
