import type { CartWithItems, ICartItem } from "../types/cart.type";

const API_URL = import.meta.env.VITE_API_URL;

export const getCartItemsByCartId = async (
  cartId: string,
): Promise<CartWithItems> => {
  try {
    const res = await fetch(`${API_URL}/carts/${cartId}/items`);
    if (!res.ok) {
      throw new Error("Không thể lấy thông tin cart");
    }
    const data: CartWithItems = await res.json();
    return data;
  } catch (error) {
    console.error("getCartItemsByCartId error:", error);
    throw error;
  }
};

export const addItemToCart = async (
  cartId: string,
  productId: string,
  quantity: number = 1,
): Promise<ICartItem> => {
  try {
    const res = await fetch(`${API_URL}/carts/${cartId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        quantity,
      }),
    });

    if (!res.ok) {
      throw new Error("Không thể thêm sản phẩm vào giỏ hàng");
    }

    return await res.json();
  } catch (error) {
    console.error("addItemToCart error:", error);
    throw error;
  }
};

export const updateCartItemQuantity = async (
  cartId: string,
  itemId: string,
  quantity: number,
): Promise<ICartItem> => {
  try {
    const res = await fetch(`${API_URL}/carts/${cartId}/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    if (!res.ok) {
      throw new Error("Không thể cập nhật số lượng");
    }

    return await res.json();
  } catch (error) {
    console.error("updateCartItemQuantity error:", error);
    throw error;
  }
};

export const removeCartItem = async (
  cartId: string,
  itemId: string,
): Promise<ICartItem> => {
  try {
    const res = await fetch(`${API_URL}/carts/${cartId}/items/${itemId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Không thể xóa sản phẩm");
    }

    return await res.json();
  } catch (error) {
    console.error("removeCartItem error:", error);
    throw error;
  }
};
