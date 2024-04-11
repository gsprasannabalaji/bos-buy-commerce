import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: [],
  productDetailsData: null
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
  },
});

export const { setSearchedProducts, setNewProduct, setProductDetailsData } = productsSlice.actions;

export default productsSlice.reducer;
