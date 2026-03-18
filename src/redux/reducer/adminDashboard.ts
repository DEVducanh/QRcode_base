import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardStats } from "../../services/admin.service";
import type { IDashboardStats } from "../../types/admin.type";

interface DashboardState {
  stats: IDashboardStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
};

export const fetchDashboardStats = createAsyncThunk<IDashboardStats, void, { rejectValue: string }>(
  "adminDashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      return await getDashboardStats();
    } catch {
      return rejectWithValue("Không thể tải thống kê");
    }
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi";
      });
  },
});

export default adminDashboardSlice.reducer;
