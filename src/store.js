
// for creating store
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// Product Reducer
import todoReducer from "./redux/reducers/todoReducer";
// import middleware function here
import { loggerMiddleware } from "./redux/middlewares/loggerMiddleware";

// creating store from reducers
export const store = configureStore({
    reducer:{
        todoReducer,
    },
    middleware: [...getDefaultMiddleware(), loggerMiddleware]
})