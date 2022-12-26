import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/Authentication/authSlice";
import cartSlice from "./features/User/pages/Cart/cartSlice";
import productSlice from "./features/User/pages/Products/ProductSlice";
import newsSlice from "./features/User/pages/News/NewsSlice";
import brandSlice from "./features/Admin/pages/ManagementBrand/BrandSlice";
import shipSlice from "./features/Admin/pages/ManagementShip/ShipSlice";
import orderSlice from "./features/User/pages/Order/OrderSlice";
import userOrderSlice from "./features/User/pages/UserOrders/UserOrderSlice";
import RateSlice from "./features/User/pages/Products/ProductDetail/RateSlice";
import orderAdminSlice from "./features/Admin/pages/ManagementOrder/OrderAdminSlice";
import voucherSlice from "./features/Admin/pages/ManagementVoucher/voucherSlice";
import accountSlice from "./features/Admin/pages/ManagementAccount/AccountSlice";
import revenueSlice from "./features/Admin/pages/Revenue/RevenueSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    product: productSlice,
    news: newsSlice,
    brand: brandSlice,
    ship: shipSlice,
    order: orderSlice,
    userOrder: userOrderSlice,
    rate: RateSlice,
    orderAdmin: orderAdminSlice,
    voucher: voucherSlice,
    account: accountSlice,
    revenue: revenueSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
