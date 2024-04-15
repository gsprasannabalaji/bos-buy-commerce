import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toast: {
        message: "",
        variant: "success",
    },
    showToast: false
}

export const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        setToast: (state, action) => {
            state.toast = action?.payload?.toast;
            state.showToast = action?.payload?.showToast;
        },
    }
})

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;