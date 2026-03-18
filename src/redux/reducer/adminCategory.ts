import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminGetCategories,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
} from "../../services/admin.service";
import type { ICategory } from "../../types/category.type";

interface CategoryState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchAdminCategories = createAsyncThunk<ICategory[], void, { rejectValue: string }>(
  "adminCategory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await adminGetCategories();
    } catch {
      return rejectWithValue("Không thể tải danh mục");
    }
  }
);

export const createCategory = createAsyncThunk<ICategory, { category_name: string; description?: string }, { rejectValue: string }>(
  "adminCategory/create",
  async (data, { rejectWithValue }) => {
    try {
      return await adminCreateCategory(data);
    } catch {
      return rejectWithValue("Không thể tạo danh mục");
    }
  }
);

export const updateCategory = createAsyncThunk<ICategory, { id: string; data: { category_name?: string; description?: string } }, { rejectValue: string }>(
  "adminCategory/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await adminUpdateCategory(id, data);
    } catch {
      return rejectWithValue("Không thể cập nhật danh mục");
    }
  }
);

export const deleteCategory = createAsyncThunk<string, string, { rejectValue: string }>(
  "adminCategory/delete",
  async (id, { rejectWithValue }) => {
    try {
      await adminDeleteCategory(id);
      return id;
    } catch {
      return rejectWithValue("Không thể xóa danh mục");
    }
  }
);

const adminCategorySlice = createSlice({
  name: "adminCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminCategories.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAdminCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAdminCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const idx = state.categories.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) state.categories[idx] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((c) => c._id !== action.payload);
      });
  },
});

export default adminCategorySlice.reducer;
