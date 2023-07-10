import {configureStore} from '@reduxjs/toolkit'
import loaderReducer from './loadersSlice';
import usersReducer from "./usersSlice";




const store = configureStore({
    reducer:{
        users:usersReducer,
        loaders:loaderReducer,
    }
})

export default store;
