import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataOrder: null,
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    dataOrderForPayPal: (state, action) => {
        console.log(action);
      const res = action.payload;
      state.dataOrder = res;
    },
  },
});

const { reducer } = OrderSlice;
const { dataOrderForPayPal } = OrderSlice.actions;
export { dataOrderForPayPal };
export default reducer;
