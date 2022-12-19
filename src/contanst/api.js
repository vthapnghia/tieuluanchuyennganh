const API_URL = {
  LOGIN: "login",
  USER: "user/",
  CART: {
    GET_ALL_CART: "cart",
    ADD_TO_CART: "cart",
    REMOVE_TO_CART: "cart/:id/:size",
    EDIT_QUANTITY: "cart"
  },
  PROFILE: "",
  NEWS: {
    ALL_NEWS: "news",
    NEWS_BY_ID: "news/:id",
    ADD_NEWS: "news",
    UPDATE_NEWS: "news/:id",
    DELETE_NEWS: "news/:id"
  }, 
  REGISTER: "login/register",
  PRODUCT: {
    ALL_PRODUCT: "product",
    PRODUCT_BY_ID: "product/:id",
    ADD_PRODUCT: "product",
    UPDATE_PRODUCT: "product/:id",
    DELETE_PRODUCT: "product/:id",
  },
  BRAND: {
    ALL_BRAND: "brand",
    ADD_BRAND: "brand",
    BRAND_BY_ID: "brand/:id",
    REMOVE_BRAND: "brand/:id"
  },
  SHIP: {
    ALL_SHIP: "ship",
    ADD_SHIP: "ship",
    SHIP_BY_ID: "ship/:id",
    REMOVE_SHIP: "ship/:id",
    UPLOAD_SHIP: "ship/:id"
  },
};

export default API_URL;
