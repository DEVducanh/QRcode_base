import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IOrderItem, IOrderResponse } from "../../types/order.type";
import { createOrder as createOrderAPI } from "../../services/order.service";

interface OrderState {
  orderItems: IOrderItem[];
  currentOrder: IOrderResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderItems: [],
  currentOrder: null,
  loading: false,
  error: null,
};

// Async thunk để tạo order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (cartId: string, { rejectWithValue }) => {
    try {
      const response = await createOrderAPI(cartId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Không thể tạo đơn hàng",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrderItemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrderItemsSuccess: (state, action: PayloadAction<IOrderItem[]>) => {
      state.loading = false;
      state.orderItems = action.payload;
    },
    fetchOrderItemsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderItemStatus: (
      state,
      action: PayloadAction<{ itemId: string; status: string }>,
    ) => {
      const { itemId, status } = action.payload;
      const itemIndex = state.orderItems.findIndex(
        (item) => item._id === itemId,
      );
      if (itemIndex !== -1) {
        state.orderItems[itemIndex].status = Number(status);
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        if (action.payload.items) {
          state.orderItems = action.payload.items;
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  fetchOrderItemsStart,
  fetchOrderItemsSuccess,
  fetchOrderItemsFailure,
  updateOrderItemStatus,
  clearCurrentOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
