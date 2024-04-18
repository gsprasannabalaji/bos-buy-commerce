import { createSlice } from "@reduxjs/toolkit";
// Initial state for the orders slice
const initialState = {
    orders : []
}
// Create a Redux slice for managing the orders state
export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        }
    }
})

export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;