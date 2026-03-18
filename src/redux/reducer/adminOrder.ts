import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminGetOrders,
  adminUpdateOrderStatus,
} from "../../services/admin.service";
import type { IOrder } from "../../types/order.type";

interface AdminOrderState {
  orders: IOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminOrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchAdminOrders = createAsyncThunk<IOrder[], void, { rejectValue: string }>(
  "adminOrder/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await adminGetOrders();
    } catch {
      return rejectWithValue("Không thể tải đơn hàng");
    }
  }
);

export const updateAdminOrderStatus = createAsyncThunk<
  IOrder,
  { id: string; status: string },
  { rejectValue: string }
>("adminOrder/updateStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    return await adminUpdateOrderStatus(id, status);
  } catch {
    return rejectWithValue("Không thể cập nhật trạng thái");
  }
});

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi";
      })
      .addCase(updateAdminOrderStatus.fulfilled, (state, action) => {
        const idx = state.orders.findIndex((o) => o._id === action.payload._id);
        if (idx !== -1) state.orders[idx] = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
