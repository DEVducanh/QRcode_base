import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../services/product.service";
import type { IProduct } from "../../types/product.type";
import type { RootState } from "../store";

export interface IState {
  products: IProduct[];
  loading: boolean;
  error: string;
  filterProduct: string;
  cartCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

const initialState: IState = {
  products: [],
  loading: false,
  error: "",
  filterProduct: "",
  cartCount: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCartCount: (state) => {
      state.cartCount += 1;
    },

    setFilter: (state, action) => {
      state.filterProduct = action.payload;
      state.page = 1;
    },

    setPage: (state, action) => {
      state.page = action.payload;
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
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Error Get Products";
      });
  },
});

export const fetchProducts = createAsyncThunk<{
  products: IProduct[];
  totalPages: number;
  currentPage: number;
  total: number;
}>("products/fetchAll", async (_, { getState }) => {
  const state = (getState() as RootState).product;
  const { filterProduct, page, limit } = state;
  const data = await getAllProducts(filterProduct, page, limit);
  return data;
});

export const { setCartCount, setFilter, setPage } = ProductSlice.actions;

export default ProductSlice.reducer;
