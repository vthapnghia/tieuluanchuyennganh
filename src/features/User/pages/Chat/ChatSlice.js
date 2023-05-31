import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatAPI from "../../../../API/chatAPI";

const getAllChat = createAsyncThunk(
  "GET_ALL_CHAT",
  async (data, { rejectWithValue }) => {
    try {
      const res = await chatAPI.getAllChat(data);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const getAllChatAdmin = createAsyncThunk(
  "GET_ALL_CHAT_ADMIN",
  async (data, { rejectWithValue }) => {
    try {
      const res = await chatAPI.getAllChatAdmin(data);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const sendMessage = createAsyncThunk(
  "SEND_MESSAGE",
  async (data, { rejectWithValue }) => {
    try {
      const res = await chatAPI.sendMessage(data);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  listChat: null,
  listUserChat: null
};
const ChatSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllChat.fulfilled]: (state, action) => {
      state.listChat = action.payload?.data;
    },
    [getAllChatAdmin.fulfilled]: (state, action) => {
      state.listUserChat = action.payload?.data;
    },
  },
});

const { reducer } = ChatSlice;
export { getAllChat, sendMessage, getAllChatAdmin };
export default reducer;
