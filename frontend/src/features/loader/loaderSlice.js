import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
};

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            debugger;
            state.isLoading = action.payload;
        },
    }
})

export const { setIsLoading } = loaderSlice.actions;

export default loaderSlice.reducer;