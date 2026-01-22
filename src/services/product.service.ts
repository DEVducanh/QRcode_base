export const getAllProducts = async (filter?: string, page = 1, limit = 10) => {
  try {
    const params = new URLSearchParams();
    if (filter) params.append("filter", filter);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(`${import.meta.env.VITE_API_URL}/products${query}`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getAllProducts error:", error);
    throw error;
  }
};
