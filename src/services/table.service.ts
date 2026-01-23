import type { TableResponse } from "../types/table";

const API_URL = import.meta.env.VITE_API_URL;

export const getTableByQRCode = async (
  tableCode: string,
): Promise<TableResponse> => {
  try {
    const res = await fetch(`${API_URL}/tables/qr/${tableCode}/session`);

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Không tìm thấy bàn với mã QR này");
      }
      throw new Error("Không thể lấy thông tin bàn");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getTableByQRCode error:", error);
    throw error;
  }
};

export const createTable = async (tableData: {
  table_number: string;
  table_code: string;
  capacity?: number;
}) => {
  try {
    const res = await fetch(`${API_URL}/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tableData),
    });

    if (!res.ok) {
      throw new Error("Không thể tạo bàn mới");
    }

    return await res.json();
  } catch (error) {
    console.error("createTable error:", error);
    throw error;
  }
};
