import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: [],
  productDetailsData: null,
  topProducts: [],
  primaryImageURL: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchedProducts: (state, action) => {
      state.productsList = action.payload;
    },
    setNewProduct: (state, action) => {
        state.newProduct = action.payload;
    },
    setProductDetailsData: (state, action) => {
      state.productDetailsData = action.payload;
    },
    setTopProducts: (state, action) => {
      state.topProducts = action.payload;
    },
    setPrimaryImageURL: (state, action) => {
      state.primaryImageURL = action.payload;
    }
  },
});

export const { setSearchedProducts, setNewProduct, setProductDetailsData, setTopProducts, setPrimaryImageURL } = productsSlice.actions;

export default productsSlice.reducer;
