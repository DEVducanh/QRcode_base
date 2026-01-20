import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { categories, products } from "../../constant/data";

const Product = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="px-4 mt-4 mb-20">
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={`rounded-full px-5 h-9 text-sm font-medium whitespace-nowrap ${
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
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-3 shadow-xs border border-gray-100 flex flex-col"
          >
            <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100 relative">
              {/* Placeholder until real images are available */}
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                Image
              </div>
              {/* <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              /> */}
            </div>
            <h3 className="font-semibold text-[#4a2c5d] text-sm mb-1 line-clamp-2 min-h-[40px]">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-bold text-[#4a2c5d]">{product.price}</span>
              <Button
                size="icon"
                className="h-8 w-8 rounded-full bg-[#aee2ff] hover:bg-[#aee2ff]/80 text-[#4a2c5d]"
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
