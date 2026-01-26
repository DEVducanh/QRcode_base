import type { IOrderItem, IOrderResponse } from "../types/order.type";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrderItemsBySessionId = async (
  sessionId: string,
): Promise<IOrderItem[]> => {
  try {
    const res = await fetch(`${API_URL}/orders/session/${sessionId}/items`);
    if (!res.ok) {
      throw new Error("Không thể lấy danh sách món ăn");
    }
    const data: IOrderItem[] = await res.json();
    return data;
  } catch (error) {
    console.error("getOrderItemsBySessionId error:", error);
    throw error;
  }
};

export const createOrder = async (cartId: string): Promise<IOrderResponse> => {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart_id: cartId }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Không thể tạo đơn hàng");
    }
    const data: IOrderResponse = await res.json();
    return data;
  } catch (error) {
    console.error("createOrder error:", error);
    throw error;
  }
};
