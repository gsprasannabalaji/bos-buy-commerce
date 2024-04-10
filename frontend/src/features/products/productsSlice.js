import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: [
    {
      productId: 1,
      name: "laptop1",
      price: 1000,
      imageURL:
        "https://m.media-amazon.com/images/I/71WV1hwFr1L.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      description: "laptop1 description",
      rating: 5,
    },
    {
      productId: 2,
      name: "laptop2",
      price: 2000,
      imageURL:
        "https://m.media-amazon.com/images/I/61ZCdzmymsL._AC_UY218_.jpg",
      description:
        "laptop2 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque a odio perspiciatis tenetur soluta illum ducimus minus. Quibusdam, minus quam quo inventore nihil ut maiores, consequuntur, ab officiis tenetur nesciunt?",

      rating: 3,
    },
  ],
  newProduct: {
    productId: 0, // need to check 
    productName: "",
    price: 0,
    imageURL: "",
    description: "",
  }
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
    }
  },
});

export const { setSearchedProducts, setNewProduct } = productsSlice.actions;

export default productsSlice.reducer;
