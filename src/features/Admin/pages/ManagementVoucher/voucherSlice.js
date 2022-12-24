import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import voucherAPI from "../../../../API/voucherAPI";

const getAllVoucher = createAsyncThunk(
  "GET_ALL_Voucher",
  async (param, { rejectWithValue }) => {
    try {
      const res = voucherAPI.getAllVoucher();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  allVoucher: null,
};
const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  extraReducers: {
    [getAllVoucher.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.allVoucher = res;
    },
  },
});

const { reducer } = voucherSlice;
export { getAllVoucher };
export default reducer;