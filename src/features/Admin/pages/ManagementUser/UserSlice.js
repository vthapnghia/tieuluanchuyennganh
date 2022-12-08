import { createSlice } from "@reduxjs/toolkit";

const getAllUser = createAsyncThunk(  "GET_ALL_USER", async (param, { rejectWithValue }) => {
    try {
      const res = true;
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  allUser: null,
};
const authSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [getAllUser.fulfilled]: (state, action) => {
      const res = action.payload.data;
      state.allUser = res;
    },
  },
});

const { reducer } = authSlice;
export { login, logout, register };
export default reducer;
