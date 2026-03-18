import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/product";
import tableReducer from "./reducer/table";
import orderReducer from "./reducer/order";
import cartReducer from "./reducer/cart";
import adminAuthReducer from "./reducer/adminAuth";
import adminDashboardReducer from "./reducer/adminDashboard";
import adminCategoryReducer from "./reducer/adminCategory";
import adminProductReducer from "./reducer/adminProduct";
import adminOrderReducer from "./reducer/adminOrder";
import adminTableReducer from "./reducer/adminTable";

export const store = configureStore({
  reducer: {
    product: productReducer,
    table: tableReducer,
    cart: cartReducer,
    order: orderReducer,
    adminAuth: adminAuthReducer,
    adminDashboard: adminDashboardReducer,
    adminCategory: adminCategoryReducer,
    adminProduct: adminProductReducer,
    adminOrder: adminOrderReducer,
    adminTable: adminTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
