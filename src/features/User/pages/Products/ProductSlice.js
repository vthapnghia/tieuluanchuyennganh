import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productAPI from "../../../../API/productAPI";

const getAllProduct = createAsyncThunk("GET_ALL_PRODUCT", async (data, {rejectWithValue}) => {
    try {
        const res = await productAPI.getALlProduct();
        return res;
    } catch (error) {
        rejectWithValue(error);
    }
});

const getProductById = createAsyncThunk("GET_PRODUCT_BY_ID", async (data, {rejectWithValue}) => {
    try {
        const res = await productAPI.getProductById(data);
        return res;
    } catch (error) {
        rejectWithValue(error);
    }
});

const addProduct = createAsyncThunk("AĐ_PRODUCT", async (data, {rejectWithValue}) => {
    try {
        const res = await productAPI.addProduct(data);
        return res;
    } catch (error) {
        rejectWithValue(error);
    }
});

const uploadProduct = createAsyncThunk("ADD_PRODUCT", async (data, {rejectWithValue}) => {
    try {
        const res = await productAPI.uploadProduct(data);
        return res;
    } catch (error) {
        rejectWithValue(error);
    }
});

const deleteProduct = createAsyncThunk("ADD_PRODUCT", async (data, {rejectWithValue}) => {
    try {
        const res = await productAPI.deleteProduct(data);
        return res;
    } catch (error) {
        rejectWithValue(error);
    }
});

const initialState = {
    products: null,
    productById: null,
    filterFlag: null,
    sortFlag: 0,
}
const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filterFlag = action.payload;
        },
        setSort: (state, action) => {
            state.sortFlag = action.payload;
        }
    },
    extraReducers: {
        [getAllProduct.fulfilled]: (state, action) =>{
            const res = action.payload?.data;
            state.products = res
        },
        [getProductById.fulfilled]: (state, action) => {
            const res = action.payload?.data;
            state.productById = res
        }
    }
});

const {reducer} = ProductSlice;
const {setFilter, setSort} = ProductSlice.actions;
export {
    getAllProduct, 
    getProductById, 
    addProduct, 
    uploadProduct, 
    deleteProduct,
    setFilter,
    setSort
};
export default reducer;