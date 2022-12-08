const PATH= {
  PRODUCT: {
    LIST_PRODUCT: "/product",
    DETAIL_PRODUCT: "/product/:id",
  },
  HOME: "/home",
  LOGIN: "/login",
  CART: "/cart",
  NEWS: {
    LIST_NEWS: "/news",
    DETAIL_NEWS: "/news/:id",
  },
  PROFILE: "/profile",
  NOT_FOUND: "/*",
  ADMIN: {
    BASE: "/admin",
    USER: "/admin/management-user",
    PRODUCTS: {
      BASE: "/admin/management-product",
      PRODUCT_DETAIL: "/admin/product/:id",
      ADD_PRODUCT: "/admin/product",
    },
    NEWS: {
      BASE: "/admin/management-news",
      NEWS_DETAIL: "/admin/news/:id",
      ADD_NEWS: "/admin/news",
    },
    BRAND: {
      BASE: "/admin/management-brand",
    },
  },
};

export default PATH;
