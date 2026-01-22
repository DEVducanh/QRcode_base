export const getAllProducts = async (filter?: string) => {
  try {
    let query = "";
    if (filter) query = filter ? `?filter=${filter}` : "";
    const res = await fetch(`${import.meta.env.VITE_API_URL}/products${query}`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return await res.json();
  } catch (error) {
    console.error("getAllProducts error:", error);
    throw error;
  }
};
