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
  listChat: [],
};
const ChatSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllChat.fulfilled]: (state, action) => {
      state.listChat = action.payload?.data;
    },
  },
});

const { reducer } = ChatSlice;
export { getAllChat, sendMessage };
export default reducer;
