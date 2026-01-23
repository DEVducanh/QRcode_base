import { useEffect, useCallback } from "react";
import {
  fetchOrderItemsStart,
  fetchOrderItemsSuccess,
  fetchOrderItemsFailure,
} from "../redux/reducer/order";
import { getOrderItemsBySessionId } from "../services/order.service";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import type { RootState } from "../redux/store";

export const useFetchOrderItem = (sessionId: string | undefined) => {
  const dispatch = useAppDispatch();
  const { orderItems, loading, error } = useAppSelector(
    (state: RootState) => state.order,
  );

  const fetchOrderItems = useCallback(async () => {
    if (!sessionId) return;

    dispatch(fetchOrderItemsStart());
    try {
      const items = await getOrderItemsBySessionId(sessionId);
      dispatch(fetchOrderItemsSuccess(items));
    } catch (err: any) {
      dispatch(
        fetchOrderItemsFailure(err.message || "Failed to fetch order items"),
      );
    }
  }, [sessionId, dispatch]);

  useEffect(() => {
    fetchOrderItems();
  }, [fetchOrderItems]);

  return { orderItems, loading, error, refetch: fetchOrderItems };
};
