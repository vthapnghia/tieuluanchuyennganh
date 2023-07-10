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

const like = createAsyncThunk("LIKE", async (data, { rejectWithValue }) => {
  try {
    const res = await favoriteAPI.like(data);
    return res;
  } catch (e) {
    rejectWithValue(e);
  }
});

const unlike = createAsyncThunk("UNLIKE", async (data, { rejectWithValue }) => {
  try {
    const res = await favoriteAPI.unlike(data);
    return res;
  } catch (e) {
    rejectWithValue(e);
  }
});
const initialState = {
  favorites: [],
  count: 0,
};

const FavoriteSlice = createSlice({
  name: "favorite",
  initialState,
  extraReducers: {
    [getAllFavorites.fulfilled]: (state, action) => {
      state.favorites = action.payload.data?.likes;
      state.count = action.payload.data?.count;
    },
  },
});

const { reducer } = FavoriteSlice;
export { getAllFavorites, like, unlike };
export default reducer;
