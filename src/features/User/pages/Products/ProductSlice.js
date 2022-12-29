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

const getProduct = createAsyncThunk("GET_PRODUCT", async (data, {rejectWithValue}) => {
    try {
        const res = await productAPI.getProduct(data);
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

const searchProduct = createAsyncThunk("SEARCH_PRODUCT", async (data, {rejectWithValue}) => {
    try {
        const res = await productAPI.searchProduct(data);
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
    page: 0,
    pageNumber: 20,
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
        },
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload;
        }
    },
    extraReducers: {
        [getAllProduct.fulfilled]: (state, action) =>{
            const res = action.payload?.data;
            state.products = res;
        },
        [getProduct.fulfilled]: (state, action) =>{
            const res = action.payload?.data;
            state.products = res;
        },
        [getProductById.fulfilled]: (state, action) => {
            const res = action.payload?.data;
            state.productById = res;
        },
        [searchProduct.fulfilled]: (state, action) => {
            const res = action.payload?.data;
            state.products = res;
        },
    }
});

const {reducer} = ProductSlice;
const {setFilter, setSort,setPageNumber} = ProductSlice.actions;
export {
    getAllProduct, 
    getProductById, 
    getProduct,
    addProduct, 
    uploadProduct, 
    deleteProduct,
    setFilter,
    setSort,
    setPageNumber,
    searchProduct
};
export default reducer;