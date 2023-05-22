import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandAPI from "../../../../API/brandAPI";

const getAllBrand = createAsyncThunk( "GET_ALL_BRAND", async (param, { rejectWithValue }) => {
    try {
      const res = await brandAPI.getALLBrand();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
});


const addBrand = createAsyncThunk( "ADD_BRAND", async (param, { rejectWithValue }) => {
  try {
    const res = await brandAPI.addBrand(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const removeBrand = createAsyncThunk( "REMOVE_BRAND", async (param, { rejectWithValue }) => {
  try {
    const res = await brandAPI.removeBrand(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});


const getBrandById = createAsyncThunk( "GET_BRAND_BY_ID", async (param, { rejectWithValue }) => {
  try {
    const res = await brandAPI.getBrandById(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});



const initialState = {
  allBrand: null,
  brandById: null,
};
const BrandSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeStateBranch: (state) => {
      state.allBranch = null;
      state.brandById = null;
    }
  },
  extraReducers: {
    [getAllBrand.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.allBrand = res;
    },
  },
});

const { reducer } = BrandSlice;
const {removeStateBranch} = BrandSlice.actions
export { 
  getAllBrand, 
  addBrand, 
  removeBrand, 
  getBrandById,
  removeStateBranch
};
export default reducer;
