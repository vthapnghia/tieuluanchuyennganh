const API_URL = {
  LOGIN: "login",
  CART: "cart",
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
    DELETE_PRODUCT: "product/:id"
  },
  BRAND: {
    ALL_BRAND: "brand",
    ADD_BRAND: "brand",
    BRAND_BY_ID: "brand/:id",
    REMOVE_BRAND: "brand/:id"
  }
  
};

export default API_URL;
