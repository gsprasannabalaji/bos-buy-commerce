import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: JSON?.parse(localStorage.getItem('cartItems')) || [],
    purchaseLimit: 4
};

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state?.cartItems?.push(action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state?.cartItems?.filter((item) => item?.id !== action?.payload?.id);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        updateQuantity: (state, action) => {
            state.cartItems = state?.cartItems?.map(item => {
                if (item?.id === action?.payload?.id) {
                    item.quantity = action?.payload?.quantity;
                    item.currentPrice = action?.payload?.price * action?.payload?.quantity;
                }
                return item;
            });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

