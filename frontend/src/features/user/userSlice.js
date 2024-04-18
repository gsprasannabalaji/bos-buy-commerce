import { createSlice } from "@reduxjs/toolkit";
// Initial state for the user slice
const initialState = {
    user: {
        email: "",
        password: "",
        role: "",
        isUserValid: false
    }
};

// Create a Redux slice for managing user-related state
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
})
// Export action creator and reducer
export const { setUser } = userSlice.actions;

export default userSlice.reducer;