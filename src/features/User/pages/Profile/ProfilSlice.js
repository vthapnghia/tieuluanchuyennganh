import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import userAPI from "../../../../API/userApi";

const getUser = createAsyncThunk(  "GET_USER", async (param, { rejectWithValue }) => {
    try {
    //   const res = userAPI.getUser(param);
    const res = true
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
    user: null
}
const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers: {
        [getUser.fulfilled]: (state, action) => {
            const res = action.payload?.data;
            state.user = res
        }
    }
});

const { reducer } = ProfileSlice;
export { getUser };
export default reducer;