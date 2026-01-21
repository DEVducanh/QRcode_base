import HeaderBack from "../../../components/Header/HeaderBack";
import { Button } from "../../../components/ui/button";
import { cartItems } from "../../../constant/data";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleOrder = () => {
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-[#f9f5ff] pt-5 pb-24">
      <HeaderBack />
      <div className="px-4 mt-4">
        <h2 className="text-xl font-bold text-[#4a2c5d] mb-4">
          Giỏ hàng của bạn
        </h2>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <p>Giỏ hàng trống</p>
            <Button
              variant="link"
              className="text-[#4a2c5d]"
              onClick={() => navigate("/")}
            >
              Quay lại thực đơn
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                  {/* Placeholder until real images are available - reverting to img tag if data has valid paths, or keep placeholder */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).parentElement!.innerText =
                        "Image";
                      (e.target as HTMLImageElement).parentElement!.className =
                        "w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center text-gray-400 text-xs";
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-[#4a2c5d] text-sm line-clamp-1">
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <div className="text-gray-500 text-xs">
                      {formatCurrency(item.price)} x {item.quantity}
                    </div>
                    <div className="font-bold text-[#4a2c5d]">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Checkout Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] rounded-t-2xl">
          <div className="max-w-110 mx-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 font-medium">Tổng cộng</span>
              <span className="text-xl font-bold text-[#4a2c5d]">
                {formatCurrency(totalAmount)}
              </span>
            </div>
            <Button
              className="w-full rounded-full bg-[#aee2ff] hover:bg-[#aee2ff]/90 text-[#4a2c5d] font-bold h-12 text-base"
              onClick={handleOrder}
            >
              Gọi món
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
