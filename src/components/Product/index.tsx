import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { categories } from "../../constant/data";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchProducts, setCartCount } from "../../redux/reducer/product";
import { useMessageApi } from "../../lib/messageContext";

const Product = () => {
  const messageApi = useMessageApi();
  const [activeCategory, setActiveCategory] = useState("All");
  const { products, loading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = () => {
    dispatch(setCartCount());
    messageApi.success("Đã thêm sản phẩm vào giỏ");
  };
  if (loading) return "loadding...";
  return (
    <div className="px-4 mt-4 mb-20">
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={`rounded-full px-5 h-9 text-sm font-semibold whitespace-nowrap ${
              activeCategory === category
                ? "bg-[#4a2c5d] text-white hover:bg-[#4a2c5d]/90"
                : "border-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl p-3 shadow-xs border border-gray-100 flex flex-col"
          >
            <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100 relative">
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                <img
                  src={product.image_url}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              /> */}
            </div>
            <h3 className="font-semibold text-[#4a2c5d] text-sm mb-1 line-clamp-2 min-h-10">
              {product.product_name}
            </h3>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-bold text-[#4a2c5d]">
                {(product.price * 1000).toLocaleString("vi-VN")}đ
              </span>
              <Button
                size="icon"
                className="h-9 w-9 rounded-full bg-[#aee2ff] hover:bg-[#aee2ff]/80 text-[#4a2c5d] transition-transform duration-200 active:scale-90"
                onClick={handleAddToCart}
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
