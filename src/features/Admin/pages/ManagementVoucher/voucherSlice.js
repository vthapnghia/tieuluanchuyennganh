import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import voucherAPI from "../../../../API/voucherAPI";

const getAllVoucher = createAsyncThunk(
  "GET_ALL_VOUCHER",
  async (param, { rejectWithValue }) => {
    try {
      const res = voucherAPI.getAllVoucher();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const deleteVoucher = createAsyncThunk(
  "DELETE_VOUCHER",
  async (param, { rejectWithValue }) => {
    try {
      const res = voucherAPI.deleteVoucher(param);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const addVoucher = createAsyncThunk(
  "ADD_VOUCHER",
  async (param, { rejectWithValue }) => {
    try {
      const res = voucherAPI.addVoucher(param);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const updateVoucher = createAsyncThunk(
  "ADD_VOUCHER",
  async (param, { rejectWithValue }) => {
    try {
      const res = voucherAPI.updateVoucher(param);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getVoucherById = createAsyncThunk(
  "GET_VOUCHER_BY_ID",
  async (param, { rejectWithValue }) => {
    try {
      const res = voucherAPI.getVoucherById(param);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  allVoucher: null,
  voucherById: null,
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    removeStateVoucher: (state) => {
      state.allVoucher = null;
      state.voucherById = null;
    },
  },
  extraReducers: {
    [getAllVoucher.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.allVoucher = res;
    },
    [getVoucherById.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.voucherById = res;
    },
  },
});

const { reducer } = voucherSlice;
const { removeStateVoucher } = voucherSlice.actions;
export {
  getAllVoucher,
  deleteVoucher,
  addVoucher,
  getVoucherById,
  updateVoucher,
  removeStateVoucher
};
export default reducer;
