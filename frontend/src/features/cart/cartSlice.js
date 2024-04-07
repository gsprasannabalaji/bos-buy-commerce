import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
};

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state?.cartItems?.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state?.cartItems?.filter(item => item?.id!== action?.payload?.id);
        },
        updateQuantity: (state, action) => {
            state?.cartItems?.forEach(item => {
                if (item?.id === action?.payload?.id) {
                    item.quantity = action?.payload?.quantity;
                }
            });
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

