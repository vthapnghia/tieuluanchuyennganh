import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartAPI from "../../../../API/cartAPI";

const getAllCart = createAsyncThunk( "GET_CART", async (param, { rejectWithValue }) => {
    try {
      const res = await cartAPI.getAllCart(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const addToCart = createAsyncThunk( "ADD_TO_CART", async (param, { rejectWithValue }) => {
    try {
      const res = await cartAPI.addToCart(param);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const editQuantity = createAsyncThunk( "EDIT_QUANTITY", async (param, { rejectWithValue }) => {
  try {
    const res = await cartAPI.editQuantity(param);
    return res;
  } catch (error) {
    rejectWithValue(error);
  }
}
);

const removeToCart = createAsyncThunk( "REMOVE_TO_CART", async (param, { rejectWithValue }) => {
  try {
    const res = await cartAPI.removeToCart(param);
    return res;
  } catch (error) {
    rejectWithValue(error);
  }
}
);

const initialState = {
  cart: null,
  count: null,
  checkBox: null,
  
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    arrayCheckBox: (state, action) => {
      state.checkBox = action.payload;
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
    removeCart: (state) => {
      state.cart = null;
      state.count = null;
      state.checkBox = null;
    }
  },
  extraReducers: {
    [getAllCart.fulfilled]: (state, action) => {
      state.cart = action.payload?.data?.cartItems;
      state.count = action.payload?.data?.count;
    },
  },
});

const { reducer } = CartSlice;
const { arrayCheckBox, updateCart, removeCart } = CartSlice.actions;
export { getAllCart, addToCart, removeToCart, editQuantity, arrayCheckBox, updateCart, removeCart };
export default reducer;
