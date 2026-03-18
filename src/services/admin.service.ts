const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("admin_token") || "";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ---- Auth ----
export const adminLogin = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

// ---- Dashboard ----
export const getDashboardStats = async () => {
  const res = await fetch(`${API_URL}/admin/dashboard/stats`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
};

// ---- Categories ----
export const adminGetCategories = async () => {
  const res = await fetch(`${API_URL}/admin/categories`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const adminCreateCategory = async (data: { category_name: string; description?: string }) => {
  const res = await fetch(`${API_URL}/admin/categories`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
};

export const adminUpdateCategory = async (id: string, data: { category_name?: string; description?: string }) => {
  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
};

export const adminDeleteCategory = async (id: string) => {
  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
};

// ---- Products ----
export const adminGetProducts = async (page = 1, limit = 10, categoryName?: string) => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (categoryName) params.append("categoryName", categoryName);
  const res = await fetch(`${API_URL}/admin/products?${params}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const adminCreateProduct = async (data: object) => {
  const res = await fetch(`${API_URL}/admin/products`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
};

export const adminUpdateProduct = async (id: string, data: object) => {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};

export const adminDeleteProduct = async (id: string) => {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
};

// ---- Tables ----
export const adminGetTables = async () => {
  const res = await fetch(`${API_URL}/admin/tables`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch tables");
  return res.json();
};

export const adminCreateTable = async (data: object) => {
  const res = await fetch(`${API_URL}/admin/tables`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create table");
  return res.json();
};

export const adminUpdateTable = async (id: string, data: object) => {
  const res = await fetch(`${API_URL}/admin/tables/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update table");
  return res.json();
};

export const adminDeleteTable = async (id: string) => {
  const res = await fetch(`${API_URL}/admin/tables/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete table");
  return res.json();
};

// ---- Orders ----
export const adminGetOrders = async () => {
  const res = await fetch(`${API_URL}/admin/orders`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const adminUpdateOrderStatus = async (id: string, status: string) => {
  const res = await fetch(`${API_URL}/admin/orders/${id}/status`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update order status");
  return res.json();
};
