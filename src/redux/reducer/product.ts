import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../services/product.service";
import type { IProduct } from "../../types/product.type";

export interface IState {
  products: IProduct[];
  loading: boolean;
  error: string;
  cartCount: number;
}

const initialState: IState = {
  products: [],
  loading: false,
  error: "",
  cartCount: 0,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCartCount: (state) => {
      state.cartCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Error Get Products";
      });
  },
});

export const fetchProducts = createAsyncThunk<IProduct[]>(
  "products/fetchAll",
  async () => {
    try {
      const data = await getAllProducts();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const { setCartCount } = ProductSlice.actions;

export default ProductSlice.reducer;
