import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productAPI from "../../../../API/productAPI";

const getAllProduct = createAsyncThunk("GET_ALL_PRODUCT", async (data, {rejectWithValue}) => {
    try {
        const res = await productAPI.getALlProduct();
        return res;
    } catch (error) {
        rejectWithValue(error);
    }
} )

const getProductById = createAsyncThunk("GET_PRODUCT_BY_ID", async (data, {rejectWithValue}) => {
    try {
        const res = await productAPI.getProductById(data);
        return res;
    } catch (error) {
        rejectWithValue(error);
    }
} )


const initialState = {
    products: null,
    productById: null,
}
const ProductSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: {
        [getAllProduct.fulfilled]: (state, action) =>{
            const res = action.payload?.data;
            state.products = res
        },
        [getProductById.fulfilled]: (state, action) => {
            const res = action.payload.data;
            state.productById = res
        }
    }
});

const {reducer} = ProductSlice;
export {getAllProduct, getProductById};
export default reducer;