import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminGetTables,
  adminCreateTable,
  adminUpdateTable,
  adminDeleteTable,
} from "../../services/admin.service";
import type { Table } from "../../types/table";

interface AdminTableState {
  tables: Table[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminTableState = {
  tables: [],
  loading: false,
  error: null,
};

export const fetchAdminTables = createAsyncThunk<Table[], void, { rejectValue: string }>(
  "adminTable/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await adminGetTables();
    } catch {
      return rejectWithValue("Không thể tải danh sách bàn");
    }
  }
);

export const createAdminTable = createAsyncThunk<Table, object, { rejectValue: string }>(
  "adminTable/create",
  async (data, { rejectWithValue }) => {
    try {
      return await adminCreateTable(data);
    } catch {
      return rejectWithValue("Không thể tạo bàn");
    }
  }
);

export const updateAdminTable = createAsyncThunk<Table, { id: string; data: object }, { rejectValue: string }>(
  "adminTable/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await adminUpdateTable(id, data);
    } catch {
      return rejectWithValue("Không thể cập nhật bàn");
    }
  }
);

export const deleteAdminTable = createAsyncThunk<string, string, { rejectValue: string }>(
  "adminTable/delete",
  async (id, { rejectWithValue }) => {
    try {
      await adminDeleteTable(id);
      return id;
    } catch {
      return rejectWithValue("Không thể xóa bàn");
    }
  }
);

const adminTableSlice = createSlice({
  name: "adminTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminTables.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAdminTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(fetchAdminTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi";
      })
      .addCase(createAdminTable.fulfilled, (state, action) => {
        state.tables.push(action.payload);
      })
      .addCase(updateAdminTable.fulfilled, (state, action) => {
        const idx = state.tables.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.tables[idx] = action.payload;
      })
      .addCase(deleteAdminTable.fulfilled, (state, action) => {
        state.tables = state.tables.filter((t) => t._id !== action.payload);
      });
  },
});

export default adminTableSlice.reducer;
