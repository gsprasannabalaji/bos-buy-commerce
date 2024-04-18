import { createSlice } from "@reduxjs/toolkit";
// Initial state for the products slice
const initialState = {
  productsList: [],
  productDetailsData: null,
  topProducts: [],
  primaryImageURL: null,
  newProduct: null
};
// Create a Redux slice for managing products state
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
// Export action creators and reducer
export const { setSearchedProducts, setNewProduct, setProductDetailsData, setTopProducts, setPrimaryImageURL } = productsSlice.actions;

export default productsSlice.reducer;
