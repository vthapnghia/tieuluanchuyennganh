const API_URL = {
  LOGIN: "login",
  LOGIN_GOOGLE: "login/google",
  VERIFY_REGISTER: "login/verify/:id",
  RESET_PASSWORD: {
    BASE: "login/resetPassword",
    VERIFY: "login/resetPassword/verify",
  },
  USER: {
    FIRST_LOGIN: "user",
    GET_USER: "user/",
    UPDATE_USER: "user",
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
    SEARCH_PRODUCT: "product/search"
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
    UPDATE_ORDER_BY_ID: "order/:id"
  },
  RATE: {
    CREATE_RATE: "rating",
    GET_RATE: "rating/:id_1/:id_2",
    UPDATE_RATE: "rating",
  },
  VOUCHER: {
    GET_ALL_VOUCHER: "promotion"
  }
};

export default API_URL;
