import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/Authentication/authSlice";
import cartSlice from "./features/User/pages/Cart/cartSlice";
import productSlice from "./features/User/pages/Products/ProductSlice";
import newsSlice from "./features/User/pages/News/NewsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    product: productSlice,
    news: newsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
