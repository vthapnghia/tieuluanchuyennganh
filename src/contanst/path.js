const PATH = {
  PRODUCT: {
    LIST_PRODUCT: "/product",
    DETAIL_PRODUCT: "/product/:id",
  },
  HOME: "/home",
  LOGIN: "/login",
  CART: "/cart",
  NEWS: {
    LIST_NEWS: "/news",
    DETAIL_NEWS: "/news/:id"
  },
  ADMIN: {
    BASE: "/admin",
    CUSTOMER: "/admin/manage-user",
    PRODUCTS: "/admin/manage-product",
    PRODUCT_DETAIL: "/admin/product/:id",
    NEWS: "/admin/manage-news",
    NEWS_DETAIL: "/admin/news/:id",
    ADD_NEWS: "/admin/news"
  },
  PROFILE: "/profile",
  NOT_FOUND: "/*",
};

export default PATH;
