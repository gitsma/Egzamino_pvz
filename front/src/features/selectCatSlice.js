import { createSlice } from "@reduxjs/toolkit";

export const myCategoriesSlice = createSlice({
    name: "myCategory",
    initialState: {
        myCategory: ''
    },
    reducers: {
        selectedCategory: (state, action) => {
            state.myCategory = action.payload;
        }
    }
});

export const { selectedCategory } = myCategoriesSlice.actions;

export default myCategoriesSlice.reducer;