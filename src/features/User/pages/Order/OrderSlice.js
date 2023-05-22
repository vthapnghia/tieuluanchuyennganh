import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderAPI from "../../../../API/orderAPI";

const createOrder = createAsyncThunk(
  "CREATE_ORDER",
  async (param, { rejectWithValue }) => {
    try {
      const res = await orderAPI.createOrder(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  dataOrder: null,
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    dataOrderForPayPal: (state, action) => {
      const res = action.payload;
      state.dataOrder = res;
    },
    removeStateOrder: (state) => {
      state.dataOrder = null;
    },
  },
  extraReducers: {
    [createOrder.fulfilled]: (state, action) => {},
  },
});

const { reducer } = OrderSlice;
const { dataOrderForPayPal, removeStateOrder } = OrderSlice.actions;
export { dataOrderForPayPal, createOrder, removeStateOrder };
export default reducer;
