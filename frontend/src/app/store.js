import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from '../features/cart/cartSlice';
import productsSliceReducer from '../features/products/productsSlice';
import userReducer from '../features/user/userSlice';
import toastReducer from '../features/toast/toastSlice';
import ordersReducer from '../features/orders/ordersSlice';
import loaderReducer from '../features/loader/loaderSlice';

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    products: productsSliceReducer,
    user: userReducer,
    toast: toastReducer,
    orders: ordersReducer,
    loader: loaderReducer,
  },
})
