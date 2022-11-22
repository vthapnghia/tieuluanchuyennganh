import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../API/userApi";
import { KEY_STORAGE } from "../../contanst/global";

const login = createAsyncThunk("LOGIN", async (param, { rejectWithValue }) => {
  try {
    const res = await userApi.login(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState = {
  user: null,
  isAuth: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const res = action.payload.data;
      state.user = res?.user;
      state.isAuth = true;
      localStorage.setItem(KEY_STORAGE.ACCESS_TOKEN, res.token);
    },
  },
});

const { reducer } = authSlice;
export { login };
export default reducer;
