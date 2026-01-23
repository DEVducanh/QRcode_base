import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IOrderItem } from "../../types/order.type";

interface OrderState {
  orderItems: IOrderItem[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderItems: [],
  loading: false,
  error: null,
};

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
  },
});

export const {
  fetchOrderItemsStart,
  fetchOrderItemsSuccess,
  fetchOrderItemsFailure,
  updateOrderItemStatus,
} = orderSlice.actions;

export default orderSlice.reducer;
