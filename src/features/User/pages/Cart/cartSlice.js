import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartAPI from "../../../../API/cartAPI";

const getCart = createAsyncThunk( "GET_CART", async (param, { rejectWithValue }) => {
    try {
      const res = await cartAPI.getCart();
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  cart: {},
  count: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: {
    [getCart.fulfilled]: (state, action) => {
      state.cart = action.payload?.data.cartItems;
      state.count = action.payload?.data.count;
    },
  },
});

const { reducer } = CartSlice;
export { getCart };
export default reducer;
