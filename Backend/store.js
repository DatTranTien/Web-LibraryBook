import { userReducer } from "./reducers/userReducer"
import {configureStore} from '@reduxjs/toolkit'
export const store = configureStore({
    reducer:{
        user:userReducer
    }
})
export const server = "https://myshop-11m9.onrender.com/api/v1"