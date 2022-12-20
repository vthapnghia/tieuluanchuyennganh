import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderAPI from "../../../../API/orderAPI";

const getAllOrder = createAsyncThunk(
  "CREATE_ORDER",
  async (param, { rejectWithValue }) => {
    try {
      const res = await orderAPI.getAllOrder(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const getOrderById = createAsyncThunk(
  "CREATE_ORDER",
  async (param, { rejectWithValue }) => {
    try {
      const res = await orderAPI.getOrderById(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  allOrder: null,
  orderById: null,
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: {
    [getAllOrder.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.allOrder = res;
    },
    [getOrderById.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.orderById = res;
    },
  },
});

const { reducer } = OrderSlice;
export { getAllOrder, getOrderById };
export default reducer;
