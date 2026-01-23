import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ICart, ICartItem, CartWithItems } from "../../types/cart.type";
import {
  getCartItemsByCartId,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
} from "../../services/cart.service";

interface CartState {
  cart: ICart | null;
  cartItems: ICartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

export const fetchCartItems = createAsyncThunk<
  CartWithItems,
  string,
  { rejectValue: string }
>("cart/fetchItems", async (cartId: string, { rejectWithValue }) => {
  try {
    const response = await getCartItemsByCartId(cartId);
    return response;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Có lỗi xảy ra",
    );
  }
});

export const addToCart = createAsyncThunk<
  ICartItem,
  { cartId: string; productId: string; quantity: number },
  { rejectValue: string }
>(
  "cart/addItem",
  async ({ cartId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await addItemToCart(cartId, productId, quantity);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Không thể thêm sản phẩm",
      );
    }
  },
);

export const updateItemQuantity = createAsyncThunk<
  ICartItem,
  { cartId: string; itemId: string; quantity: number },
  { rejectValue: string }
>(
  "cart/updateQuantity",
  async ({ cartId, itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartItemQuantity(cartId, itemId, quantity);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Không thể cập nhật số lượng",
      );
    }
  },
);

export const removeItem = createAsyncThunk<
  string,
  { cartId: string; itemId: string },
  { rejectValue: string }
>("cart/removeItem", async ({ cartId, itemId }, { rejectWithValue }) => {
  try {
    await removeCartItem(cartId, itemId);
    return itemId;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Không thể xóa sản phẩm",
    );
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<CartWithItems>) => {
          state.loading = false;
          state.cart = action.payload.cart;
          state.cartItems = action.payload.items;
        },
      )
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không thể lấy giỏ hàng";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không thể thêm sản phẩm";
      })
      .addCase(updateItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateItemQuantity.fulfilled,
        (state, action: PayloadAction<ICartItem>) => {
          state.loading = false;
          const index = state.cartItems.findIndex(
            (item) => item._id === action.payload._id,
          );
          if (index >= 0) {
            state.cartItems[index] = action.payload;
          }
        },
      )
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không thể cập nhật";
      })
      .addCase(removeItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItem.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không thể xóa sản phẩm";
      });
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
