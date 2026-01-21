import { ShoppingBasket, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { cartItems } from "../../constant/data";
import { Button } from "../ui/button";
import { useAppSelector } from "../../redux/hook";
import type { RootState } from "../../redux/store";

const Header = () => {
  const navigate = useNavigate();
  const { cartCount } = useAppSelector((state: RootState) => state.product);
  return (
    <div className="relative h-15 bg-[#f9f5ff] flex items-center justify-center ">
      <img
        src={"./images/logo.svg"}
        alt="Logo"
        width={63}
        height={63}
        className="absolute left-1/2 -translate-x-1/2 w-13 h-13"
      />
      <div className="flex items-center justify-center absolute right-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative cursor-pointer p-1">
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                {cartCount}
              </span>
              <ShoppingBasket className="text-[#4a2c5d]" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="mt-2.5 w-50 max-h-64 overflow-y-auto"
          >
            {cartItems.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                Giỏ hàng trống
              </p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 py-2 border-b last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded object-cover"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.price.toLocaleString()}đ x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-1 bg-white sticky bottom-0">
                  <Button
                    className="w-full bg-[#4a2c5d] text-white text-sm py-2 rounded"
                    onClick={() => navigate("/cart")}
                  >
                    Xem giỏ hàng
                  </Button>
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer p-1">
              <UserRound className="text-[#4a2c5d]" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="mt-2.5">
            <Link to="/orders">
              <DropdownMenuItem className="font-medium justify-center">
                Đơn hàng
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="font-medium justify-center">
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
