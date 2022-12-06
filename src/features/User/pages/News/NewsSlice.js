import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import newsAPI from "../../../../API/newsAPI";

const getAllNews = createAsyncThunk(
  "GET_ALL_NEWS",
  async (param, { rejectWithValue }) => {
    try {
      const res = await newsAPI.getAllNews();
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const getNewsById = createAsyncThunk(
  "GET_NEWS_LIST",
  async (param, { rejectWithValue }) => {
    try {
      const res = await newsAPI.getNewsById(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const addNews = createAsyncThunk(
  "ADD_NEWS",
  async (param, { rejectWithValue }) => {
    try {
      const res = await newsAPI.addNews(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const uploadNews = createAsyncThunk(
  "UPLOAD_NEWS",
  async (param, { rejectWithValue }) => {
    try {
      const res = await newsAPI.updateNews(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const deleteNews = createAsyncThunk(
  "DELETE_NEWS",
  async (param, { rejectWithValue }) => {
    try {
      const res = await newsAPI.deleteNews(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  allNews: null,
  newsById: null,
};
const NewsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: {
    [getAllNews.fulfilled]: (state, action) => {
      const res = action.payload.data;
      state.allNews = res;
    },
    [getNewsById.fulfilled]: (state, action) => {
      const res = action.payload.data;
      state.newsById = res;
    },
  },
});

const { reducer } = NewsSlice;
export { getAllNews, getNewsById, addNews, uploadNews, deleteNews };
export default reducer;
