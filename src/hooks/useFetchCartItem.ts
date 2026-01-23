import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchCartItems } from "../redux/reducer/cart";
import { getCartIdFromStorage } from "../lib/localStorage";

export const useFetchCartItems = () => {
  const dispatch = useAppDispatch();
  const { cart, cartItems, loading, error } = useAppSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    const cartId = getCartIdFromStorage();

    if (cartId) {
      dispatch(fetchCartItems(cartId));
    }
  }, [dispatch]);

  return {
    cart,
    cartItems,
    loading,
    error,
  };
};
