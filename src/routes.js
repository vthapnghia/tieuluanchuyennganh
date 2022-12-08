import  PATH from "./contanst/path";
import { lazy } from "react";


const ManagementProduct = lazy(() => import("./features/Admin/pages/ManagementProduct")); 
const ProductDetailAdmin = lazy(() => import("./features/Admin/pages/ManagementProduct/ProductDetail"));
const ManagementNews = lazy(() => import("./features/Admin/pages/ManagementNews"));
const NewDetail = lazy(() => import("./features/Admin/pages/ManagementNews/NewsDetail"));
const ManagementUser = lazy(() => import("./features/Admin/pages/ManagementUser"));
const ManagementBrand = lazy(() => import("./features/Admin/pages/ManagementBrand")); 

const routesAdmin = [
  {
    path: PATH.ADMIN.BASE,
    name: "Admin base",
    component: ManagementProduct,
  },
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
    path:PATH.ADMIN.NEWS.BASE,
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
    path: PATH.ADMIN.USER,
    name: "User",
    component: ManagementUser,
  },
  {
    path:PATH.ADMIN.BRAND.BASE,
    name: "Brand base",
    component: ManagementBrand,
  },
]


export { routesAdmin};
