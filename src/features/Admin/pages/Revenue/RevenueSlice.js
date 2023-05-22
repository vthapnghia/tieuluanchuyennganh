import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import revenueAPI from "../../../../API/RevenueAPI";

const getRevenueByMonth = createAsyncThunk(
  "GET_REVENUE_BY_MONTH",
  async (param, { rejectWithValue }) => {
    try {
      const res = revenueAPI.getRevenueByMonth(param);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getRevenueByYear = createAsyncThunk(
  "GET_REVENUE_BY_DAY",
  async (param, { rejectWithValue }) => {
    try {
      const res = revenueAPI.getRevenueByYear(param);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  revenueByMonth: null,
  revenueByYear: null,
};

const revenueSlice = createSlice({
  name: "revenue",
  initialState,
  reducers: {
    removeStateRevenue: (state) => {
      state.revenueByMonth = null;
      state.revenueByYear = null;
    },
  },
  extraReducers: {
    [getRevenueByMonth.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.revenueByMonth = res;
    },
    [getRevenueByYear.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.revenueByYear = res;
    },
  },
});

const { removeStateRevenue } = revenueSlice.actions;
export { getRevenueByMonth, getRevenueByYear, removeStateRevenue };
export default revenueSlice.reducer;
