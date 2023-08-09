import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../services/categoriesServise";

const initialState = {
    categories: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//get categories
export const getCategories = createAsyncThunk(
    'categories/getAll',
    async (_, thunkAPI) => {
        try {
            return await categoryService.getAllCategoriesData()
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//create new category
export const setCategory = createAsyncThunk(
    'categories/create',
    async (categoryData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await categoryService.setCategory(categoryData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//delete category
export const deleteCategory = createAsyncThunk(
    'category/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await categoryService.deleteCategory(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        resete: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(setCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.categories.push(action.payload)
            })
            .addCase(setCategory.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.categories = action.payload
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.categories = state.categories.filter(
                    (category) => category._id !== action.payload.id
                )
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
});

export const { resete } = categorySlice.actions;

export default categorySlice.reducer;