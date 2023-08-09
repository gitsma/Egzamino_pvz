import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import categoriesReducer from '../features/categoriesSlice';
import adsReducer from '../features/adsSlice';
import myCategoryReducer from '../features/selectCatSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoriesReducer,
        myCategory: myCategoryReducer,
        ads: adsReducer
    },
});