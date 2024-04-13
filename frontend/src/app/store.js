import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from '../features/cart/cartSlice';
import productsSliceReducer from '../features/products/productsSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    products: productsSliceReducer,
    user: userReducer
  },
})