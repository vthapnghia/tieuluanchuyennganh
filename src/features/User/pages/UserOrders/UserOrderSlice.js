import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderAPI from "../../../../API/orderAPI";

const getAllOrder = createAsyncThunk(
  "GET_ALL_ORDER",
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
  "GET_ORDER_BY_ID",
  async (param, { rejectWithValue }) => {
    try {
      const res = await orderAPI.getOrderById(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const updateOrderById = createAsyncThunk(
  "UPDATE_ORDER_BY_ID",
  async (param, { rejectWithValue }) => {
    try {
      const res = await orderAPI.updateOrder(param);
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
  reducers: {
    setOrderByID: (state, action) => {
      state.orderById = action.payload;
    },
    removeUserOrder: (state, action) => {
      state.allOrder = null;
      state.orderById = null;
    }
  },
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
const { setOrderByID, removeUserOrder } = OrderSlice.actions;
export { getAllOrder, getOrderById, updateOrderById, setOrderByID, removeUserOrder };
export default reducer;
