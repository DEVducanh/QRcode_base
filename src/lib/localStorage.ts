import type { ICart } from "../types/cart.type";
import type { ISession } from "../types/session";

/**
 * Lấy cart từ localStorage
 * @returns Cart object hoặc null nếu không tìm thấy
 */
export const getCartFromStorage = (): ICart | null => {
  try {
    const savedCart = localStorage.getItem("currentCart");
    if (!savedCart) return null;

    const cartData = JSON.parse(savedCart);
    return cartData;
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return null;
  }
};

/**
 * Lấy cartId từ localStorage
 * @returns cartId string hoặc null
 */
export const getCartIdFromStorage = (): string | null => {
  const cart = getCartFromStorage();
  return cart?._id || null;
};

/**
 * Lưu cart vào localStorage
 * @param cart - Cart object cần lưu
 */
export const saveCartToStorage = (cart: ICart): void => {
  try {
    localStorage.setItem("currentCart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

/**
 * Xóa cart khỏi localStorage
 */
export const removeCartFromStorage = (): void => {
  localStorage.removeItem("currentCart");
};

export const getSessionFromStorage = (): ISession | null => {
  try {
    const savedSession = localStorage.getItem("currentSession");
    if (!savedSession) return null;

    const sessionData = JSON.parse(savedSession);
    return sessionData;
  } catch (error) {
    console.error("Error parsing session from localStorage:", error);
    return null;
  }
};

export const getSessionIdFromStorage = (): string | null => {
  const session = getSessionFromStorage();
  return session?._id || null;
};
