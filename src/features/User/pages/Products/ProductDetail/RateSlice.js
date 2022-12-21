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

const initialState = {};
const RateSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {},
});

const { reducer } = RateSlice;
export { createRate };
export default reducer;
