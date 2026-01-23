import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/product";
import tableReducer from "./reducer/table";
import orderReducer from "./reducer/order";
import cartReducer from "./reducer/cart";

export const store = configureStore({
  reducer: {
    product: productReducer,
    table: tableReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
