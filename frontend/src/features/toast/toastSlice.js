import { createSlice } from "@reduxjs/toolkit";
// Initial state for the toast slice
const initialState = {
    toast: {
        message: "",
        variant: "success",
    },
    showToast: false
}
// Create a Redux slice for managing toast notifications
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
// Export action creator and reducer
export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;