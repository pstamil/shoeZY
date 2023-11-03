import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../Slices/productsSlice";
import cartReducer from "../Slices/cartSlice";

const store = configureStore({
  reducer: {
    product: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
