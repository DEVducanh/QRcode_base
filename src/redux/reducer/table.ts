import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Table, TableResponse } from "../../types/table";
import type { ISession } from "../../types/session";
import type { ICart } from "../../types/cart.type";
import { getTableByQRCode } from "../../services/table.service";

interface TableState {
  currentTable: Table | null;
  currentSession: ISession | null;
  currentCart: ICart | null;
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  currentTable: null,
  currentSession: null,
  currentCart: null,
  loading: false,
  error: null,
};

// Async thunk để scan QR code và lấy thông tin
export const scanQRCode = createAsyncThunk<
  TableResponse,
  string,
  { rejectValue: string }
>("table/scanQRCode", async (tableCode: string, { rejectWithValue }) => {
  try {
    const response = await getTableByQRCode(tableCode);
    return response;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Có lỗi xảy ra",
    );
  }
});

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scanQRCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        scanQRCode.fulfilled,
        (state, action: PayloadAction<TableResponse>) => {
          state.loading = false;
          state.currentTable = action.payload.table;
          state.currentSession = action.payload.session;
          state.currentCart = action.payload.cart;
          state.error = null;

          // Lưu vào localStorage để persist khi reload
          localStorage.setItem(
            "currentTable",
            JSON.stringify(action.payload.table),
          );
          localStorage.setItem(
            "currentSession",
            JSON.stringify(action.payload.session),
          );
          localStorage.setItem(
            "currentCart",
            JSON.stringify(action.payload.cart),
          );
        },
      )
      .addCase(scanQRCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không thể quét mã QR";
      });
  },
});

export const {} = tableSlice.actions;
export default tableSlice.reducer;
