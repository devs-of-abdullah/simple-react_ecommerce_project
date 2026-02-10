import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import productReducer from "./slices/productSlice";
import  basketRdeucer  from "./slices/basketSlice";
export const store = configureStore({
  reducer: {
    app: appReducer,
    product: productReducer,
    basket : basketRdeucer,
  },
});
