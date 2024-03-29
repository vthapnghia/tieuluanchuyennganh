import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accountAPI from "../../../../API/accountAPI";

const getAllAccount = createAsyncThunk(
  "GET_ALL_ACCOUNT",
  async (param, { rejectWithValue }) => {
    try {
      const res = accountAPI.getAllAccount();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const deleteAccount = createAsyncThunk(
  "DELETE_ACCOUNT",
  async (param, { rejectWithValue }) => {
    try {
      const res = accountAPI.deleteAccount(param);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const searchAccount = createAsyncThunk(
  "DELETE_ACCOUNT",
  async (param, { rejectWithValue }) => {
    try {
      const res = accountAPI.searchAccount(param);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  allAccount: null,
};
const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    removeStateAccount: (state) => {
      state.allAccount = null;
    },
  },
  extraReducers: {
    [getAllAccount.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.allAccount = res;
    },
  },
});

const { reducer } = AccountSlice;
const { removeStateAccount } = AccountSlice.actions;
export { getAllAccount, deleteAccount, searchAccount, removeStateAccount };
export default reducer;
