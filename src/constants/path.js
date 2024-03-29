const PATH = {
  BASE: "/",
  PRODUCT: {
    LIST_PRODUCT: "/product",
    DETAIL_PRODUCT: "/product/:id",
  },
  HOME: "/home",

  CART: "/cart",
  ORDER: "/order",
  USER_ORDERS: {
    BASE: "/user-order",
    ORDER_DETAIL: "/order-detail/:id",
  },
  NEWS: {
    LIST_NEWS: "/news",
    DETAIL_NEWS: "/news/:id",
  },
  NOT_FOUND: "/*",
  ADMIN: {
    LOGIN: "/admin",
    RESET_PASSWORD: "/admin/reset-password",
    NEW_PASSWORD: "/admin/new-password",
    ACCOUNT: "/admin/management-account",
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
    SHIP: {
      BASE: "/admin/management-ship",
    },
    ORDER: {
      BASE: "/admin/management-order",
      ORDER_DETAIL: "/admin/order/:id",
    },
    VOUCHER: {
      BASE: "/admin/management-voucher",
    },
    REVENUE: "/admin/revenue",
    CHAT: "/admin/chat"
  },
};

export default PATH;
