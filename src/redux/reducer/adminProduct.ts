import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminGetProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} from "../../services/admin.service";
import type { IProduct } from "../../types/product.type";

interface AdminProductState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}

const initialState: AdminProductState = {
  products: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
};

export const fetchAdminProducts = createAsyncThunk<
  { products: IProduct[]; totalPages: number },
  { page?: number; limit?: number; categoryName?: string },
  { rejectValue: string }
>("adminProduct/fetchAll", async ({ page = 1, limit = 10, categoryName }, { rejectWithValue }) => {
  try {
    return await adminGetProducts(page, limit, categoryName);
  } catch {
    return rejectWithValue("Không thể tải sản phẩm");
  }
});

export const createAdminProduct = createAsyncThunk<IProduct, object, { rejectValue: string }>(
  "adminProduct/create",
  async (data, { rejectWithValue }) => {
    try {
      return await adminCreateProduct(data);
    } catch {
      return rejectWithValue("Không thể tạo sản phẩm");
    }
  }
);

export const updateAdminProduct = createAsyncThunk<IProduct, { id: string; data: object }, { rejectValue: string }>(
  "adminProduct/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await adminUpdateProduct(id, data);
    } catch {
      return rejectWithValue("Không thể cập nhật sản phẩm");
    }
  }
);

export const deleteAdminProduct = createAsyncThunk<string, string, { rejectValue: string }>(
  "adminProduct/delete",
  async (id, { rejectWithValue }) => {
    try {
      await adminDeleteProduct(id);
      return id;
    } catch {
      return rejectWithValue("Không thể xóa sản phẩm");
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {
    setAdminPage: (state, action) => { state.page = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi";
      })
      .addCase(createAdminProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        const idx = state.products.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) state.products[idx] = action.payload;
      })
      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  },
});

export const { setAdminPage } = adminProductSlice.actions;
export default adminProductSlice.reducer;
