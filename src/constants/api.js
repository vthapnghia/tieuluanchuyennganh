const API_URL = {
  LOGIN: "login",
  LOGIN_GOOGLE: "login/google",
  ADMIN_LOGIN: "login/admin",
  VERIFY_REGISTER: "login/verify/:id",
  RESET_PASSWORD: {
    BASE: "login/resetPassword",
    VERIFY: "login/resetPassword/verify",
  },
  USER: {
    FIRST_LOGIN: "user",
    GET_USER: "user/",
    UPDATE_USER: "user",
    GET_ALL_ACCOUNT: "user/account",
    DELETE_ACCOUNT: "user/account/:id",
    SEARCH_ACCOUNT: "user/account/search",
  },
  CART: {
    GET_ALL_CART: "cart",
    ADD_TO_CART: "cart",
    REMOVE_TO_CART: "cart/:id/:size",
    EDIT_QUANTITY: "cart",
  },
  PROFILE: "",
  NEWS: {
    ALL_NEWS: "news",
    NEWS_BY_ID: "news/:id",
    ADD_NEWS: "news",
    UPDATE_NEWS: "news/:id",
    DELETE_NEWS: "news/:id",
  },
  REGISTER: "login/register",
  PRODUCT: {
    ALL_PRODUCT: "product",
    PRODUCT_BY_ID: "product/:id",
    ADD_PRODUCT: "product",
    UPDATE_PRODUCT: "product/:id",
    DELETE_PRODUCT: "product/:id",
    SEARCH_PRODUCT: "product/search",
  },
  BRAND: {
    ALL_BRAND: "brand",
    ADD_BRAND: "brand",
    BRAND_BY_ID: "brand/:id",
    REMOVE_BRAND: "brand/:id",
  },
  SHIP: {
    ALL_SHIP: "ship",
    ADD_SHIP: "ship",
    SHIP_BY_ID: "ship/:id",
    REMOVE_SHIP: "ship/:id",
    UPLOAD_SHIP: "ship/:id",
  },
  ORDER: {
    CREATE_ORDER: "order",
    GET_ALL_ORDER_USER: "order/user",
    GET_ALL_ORDER_ADMIN: "order",
    GET_ORDER_BY_ID: "order/:id",
    UPDATE_ORDER_BY_ID: "order/:id",
  },
  RATE: {
    CREATE_RATE: "rating",
    GET_RATE: "rating/:id_1/:id_2",
    UPDATE_RATE: "rating",
  },
  VOUCHER: {
    GET_ALL_VOUCHER: "promotion",
    DELETE_VOUCHER: "promotion/:id",
    ADD_VOUCHER: "promotion",
    GET_VOUCHER_BY_ID: "promotion/:id",
    UPDTAE_VOUCHER: "promotion/:id",
  },
  REVENUE: {
    REVENUE_BY_MONTH: "statics/month",
    REVENUE_BY_YEAR: "statics/year",
  },
  CHAT: {
    ALL: "chats",
    SEND: "chats",
    ADMIN: "chats/userList"
  },
};

export default API_URL;
