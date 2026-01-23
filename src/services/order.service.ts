import type { IOrderItem } from "../types/order.type";

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
