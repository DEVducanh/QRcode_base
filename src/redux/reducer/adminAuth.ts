import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { adminLogin } from "../../services/admin.service";
import type { IAdmin } from "../../types/admin.type";

interface AuthState {
  admin: IAdmin | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  admin: null,
  token: localStorage.getItem("admin_token"),
  loading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk<
  { access_token: string },
  { username: string; password: string },
  { rejectValue: string }
>("adminAuth/login", async (credentials, { rejectWithValue }) => {
  try {
    return await adminLogin(credentials.username, credentials.password);
  } catch {
    return rejectWithValue("Tên đăng nhập hoặc mật khẩu không đúng");
  }
});

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem("admin_token");
    },
    setAdmin: (state, action: PayloadAction<IAdmin>) => {
      state.admin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        localStorage.setItem("admin_token", action.payload.access_token);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đăng nhập thất bại";
      });
  },
});

export const { logout, setAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
