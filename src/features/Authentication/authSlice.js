import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { KEY_STORAGE } from "../../contanst/global";
import { storeJsonObject } from "../../until/common";
import userAPI from "../../API/userAPI";

const login = createAsyncThunk("LOGIN", async (param, { rejectWithValue }) => {
  try {
    const res = await userAPI.login(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const logout = createAsyncThunk( "LOGOUT", async (param, { rejectWithValue }) => {
    try {
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const register = createAsyncThunk(  "REGISTER", async (param, { rejectWithValue }) => {
    try {
      const res = "";
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  user: null,
  isAuth: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.user = res?.user;
      state.isAuth = true;
      localStorage.setItem(KEY_STORAGE.ACCESS_TOKEN, res.token);
      storeJsonObject(KEY_STORAGE.CP_USER, res?.user);
    },
    [logout.pending]: (state, action) => {
      state.isAuth = false;
      state.user = null;
      localStorage.clear();
    },
    [register.fulfilled]: (state, action) => {},
  },
});

const { reducer } = authSlice;
export { login, logout, register };
export default reducer;
