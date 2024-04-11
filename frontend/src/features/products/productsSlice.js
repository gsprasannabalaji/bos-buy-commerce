import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: [],
  productDetailsData: null,
  topProducts: []
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
    }
  },
});

export const { setSearchedProducts, setNewProduct, setProductDetailsData, setTopProducts } = productsSlice.actions;

export default productsSlice.reducer;
