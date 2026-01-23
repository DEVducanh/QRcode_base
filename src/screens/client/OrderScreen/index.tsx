import HeaderBack from "../../../components/Header/HeaderBack";
import { Button } from "../../../components/ui/button";
import { useFetchOrderItem } from "../../../hooks/useFetchOrderItem";
import { getSessionIdFromStorage } from "../../../lib/localStorage";
import { useAppSelector } from "../../../redux/hook";

const OrderScreen = () => {
  const sessionId = getSessionIdFromStorage();
  useFetchOrderItem(sessionId || "");
  const { orderItems } = useAppSelector((state) => state.order);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#f9f5ff] pb-10">
      <HeaderBack />
      <div className="px-4 mt-5 pb-25">
        <h2 className="text-xl font-semibold text-[#4a2c5d] mb-4">
          Đơn hàng của bạn
        </h2>

        <div className="flex flex-col gap-3">
          {orderItems.map((order) => {
            const getStatusUI = (status: number) => {
              switch (status) {
                case 1:
                  return {
                    label: "Chờ xác nhận",
                    className: "bg-yellow-100 text-yellow-700",
                  };
                case 2:
                  return {
                    label: "Đang pha chế",
                    className: "bg-blue-100 text-blue-700",
                  };
                case 3:
                  return {
                    label: "Hoàn thành",
                    className: "bg-green-100 text-green-700",
                  };
                case 4:
                  return {
                    label: "Đã phục vụ",
                    className: "bg-gray-100 text-gray-700",
                  };
                default:
                  return {
                    label: "Không xác định",
                    className: "bg-gray-100 text-gray-500",
                  };
              }
            };
            const statusUI = getStatusUI(order.status);
            return (
              <div
                key={order._id}
                className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                  <img
                    src={order.product_id.image_url}
                    alt={order.product_id.product_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-[#4a2c5d] text-sm line-clamp-1">
                        {order.product_id.product_name}
                      </h3>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusUI.className}`}
                      >
                        {statusUI.label}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      {formatCurrency(order.price * 1000)} x {order.quantity}
                    </div>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <div className="text-xs text-gray-400">Tổng cộng:</div>
                    <div className="font-bold text-[#4a2c5d]">
                      {formatCurrency(order.price * order.quantity * 1000)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-110 mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 font-medium">Tổng thanh toán</span>
            {/* <span className="text-xl font-bold text-[#4a2c5d]">
              {formatCurrency(totalAmount)}
            </span> */}
          </div>
          <Button className="w-full rounded-full bg-[#aee2ff] hover:bg-[#aee2ff]/80 text-[#4a2c5d] font-bold h-12 text-base">
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
