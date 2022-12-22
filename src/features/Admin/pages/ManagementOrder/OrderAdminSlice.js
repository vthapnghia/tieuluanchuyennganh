import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderAPI from "../../../../API/orderAPI";

const getAllOrderAdmin = createAsyncThunk( "GET_ALL_ORDER", async (param, { rejectWithValue }) => {
  try {
    const res = await orderAPI.getAllOrderAdmin(param);
    return res;
  } catch (error) {
    rejectWithValue(error);
  }
}
);

const initialState = {
  allOrderAdmin: null,
};

const OrderSlice = createSlice({
  name: "orderAdmin",
  initialState,
  extraReducers: {
    [getAllOrderAdmin.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.allOrderAdmin = res;
    },
  },
});

const { reducer } = OrderSlice;
export { getAllOrderAdmin };
export default reducer;
