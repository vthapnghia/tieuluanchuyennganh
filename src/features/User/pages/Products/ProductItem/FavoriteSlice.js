import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import favoriteAPI from "../../../../../API/favoriteAPI";

const getAllFavorites = createAsyncThunk(
  "GET_ALL_FAVORITE",
  async (data, { rejectWithValue }) => {
    try {
      const res = await favoriteAPI.getAllFavorites();
      return res;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

const like = createAsyncThunk(
  "LIKE",
  async (data, { rejectWithValue }) => {
    try {
      const res = await favoriteAPI.like(data);
      return res;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
const initialState = {
  favorites: [],
};

const FavoriteSlice = createSlice({
  name: "favorite",
  initialState,
  extraReducers: {
    [getAllFavorites.fulfilled]: (state, action) => {
      state.favorites = action.payload.data;
    }
  },
});

const { reducer } = FavoriteSlice;
export { getAllFavorites, like };
export default reducer;
