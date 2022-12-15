import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import shipAPI from "../../../../API/shipAPI";

const getAllShip = createAsyncThunk( "GET_ALL_SHIP", async (param, { rejectWithValue }) => {
    try {
      const res = await shipAPI.getALLShip();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
});


const addShip = createAsyncThunk( "ADD_SHIP", async (param, { rejectWithValue }) => {
  try {
    const res = await shipAPI.addShip(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const removeShip = createAsyncThunk( "REMOVE_SHIP", async (param, { rejectWithValue }) => {
  try {
    const res = await shipAPI.removeShip(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});


const getShipById = createAsyncThunk( "GET_SHIP_BY_ID", async (param, { rejectWithValue }) => {
  try {
    const res = await shipAPI.getShipById(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const uploadShip = createAsyncThunk( "UPLOAD_SHIP", async (param, { rejectWithValue }) => {
  try {
    const res = await shipAPI.uploadShip(param);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState = {
  allShip: null,
  shipById: null,
};
const ShipSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [getAllShip.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.allShip = res;
    },
    [getShipById.fulfilled]: (state, action) => {
      const res = action.payload?.data;
      state.shipById = res?.ship;
    },
  },
});

const { reducer } = ShipSlice;
export { 
  getAllShip, 
  addShip, 
  removeShip, 
  getShipById,
  uploadShip
};
export default reducer;
