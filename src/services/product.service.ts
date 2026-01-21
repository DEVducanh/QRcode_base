export const getAllProducts = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return await res.json();
  } catch (error) {
    console.error("getAllProducts error:", error);
    throw error;
  }
};
