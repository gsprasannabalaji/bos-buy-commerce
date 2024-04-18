import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
};
// Create a Redux slice for managing the loader state
export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    }
})

export const { setIsLoading } = loaderSlice.actions;

export default loaderSlice.reducer;