import { ShoppingBasket, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";

const Header = () => {
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
        <div className="cursor-pointer p-1">
          <ShoppingBasket className="text-[#4a2c5d]" />
        </div>
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
