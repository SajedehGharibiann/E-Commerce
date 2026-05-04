import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./Slice/cartSlice";
import authSliceReducer from "./Slice/AuthSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    cart: cartSliceReducer,
  },
});

export default store;
