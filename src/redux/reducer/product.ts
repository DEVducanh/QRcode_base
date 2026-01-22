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
}

const initialState: IState = {
  products: [],
  loading: false,
  error: "",
  filterProduct: "",
  cartCount: 0,
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
  async (_, { getState }) => {
    const filter = (getState() as RootState).product.filterProduct;
    const data = await getAllProducts(filter);
    return data;
  },
);

export const { setCartCount, setFilter } = ProductSlice.actions;

export default ProductSlice.reducer;
