import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { KEY_STORAGE } from "../../contanst/global";
import { storeJsonObject } from "../../until/common";
import userAPI from "../../API/userApi";

const login = createAsyncThunk("LOGIN", async (param, { rejectWithValue }) => {
  try {
    const res = await userAPI.login(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const logout = createAsyncThunk(
  "LOGOUT",
  async (param, { rejectWithValue }) => {
    try {
      const res = true;
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const register = createAsyncThunk(
  "REGISTER",
  async (param, { rejectWithValue }) => {
    try {
      const res = userAPI.register(param);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getUser = createAsyncThunk(
  "GET_USER",
  async (param, { rejectWithValue }) => {
    try {
      const res = userAPI.getUser(param);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  user: null,
  isAdmin: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.user = res?.user;
      state.isAdmin = res?.is_admin;
      localStorage.setItem(KEY_STORAGE.ACCESS_TOKEN, res?.token);
      storeJsonObject(KEY_STORAGE.IS_ADMIN, res?.is_admin);
      storeJsonObject(KEY_STORAGE.CP_USER, res?.user);
    },
    [logout.pending]: (state, action) => {
      state.isAuth = false;
      state.user = null;
      localStorage.clear();
    },
    [getUser.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.user = res?.user;
    },
    // [register.fulfilled]: (state, action) => {},
  },
});

const { reducer } = authSlice;
export { login, logout, register, getUser };
export default reducer;
