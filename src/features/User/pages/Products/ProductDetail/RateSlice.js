import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rateAPI from "../../../../../API/rateAPI";

const createRate = createAsyncThunk(
  "CREATE_RATE",
  async (data, { rejectWithValue }) => {
    try {
      const res = await rateAPI.createRate(data);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const getRate = createAsyncThunk(
  "GET_RATE",
  async (data, { rejectWithValue }) => {
    try {
      const res = await rateAPI.getRate(data);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const updateRate = createAsyncThunk(
  "UPDATE_RATE",
  async (data, { rejectWithValue }) => {
    try {
      const res = await rateAPI.updateRate(data);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  rateProduct: null,
};
const RateSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [getRate.fulfilled]: (state, actions) => {
      const res = actions.payload?.actions;
      state.rateProduct = res;
    }
  },
});

const { reducer } = RateSlice;
export { createRate, getRate, updateRate };
export default reducer;
