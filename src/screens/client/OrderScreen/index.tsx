import HeaderBack from "../../../components/Header/HeaderBack";
import { Button } from "../../../components/ui/button";
import { orders } from "../../../constant/data";

const OrderScreen = () => {
  const totalAmount = orders.reduce(
    (acc, order) => acc + order.price * order.quantity,
    0,
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Chờ xác nhận":
        return "bg-yellow-100 text-yellow-700 font-semibold";
      case "Đang pha chế":
        return "bg-blue-100 text-blue-700 font-semibold";
      case "Hoàn thành":
        return "bg-green-100 text-green-700 font-semibold";
      default:
        return "bg-gray-100 text-gray-700 font-semibold";
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5ff] pb-24">
      <HeaderBack />
      <div className="px-4 mt-5">
        <h2 className="text-xl font-semibold text-[#4a2c5d] mb-4">
          Đơn hàng của bạn
        </h2>

        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                {/* Placeholder until real images are available */}
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  Image
                </div>
                {/* <img
                  src={order.image}
                  alt={order.name}
                  className="w-full h-full object-cover"
                /> */}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-[#4a2c5d] text-sm line-clamp-1">
                      {order.name}
                    </h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    {formatCurrency(order.price)} x {order.quantity}
                  </div>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <div className="text-xs text-gray-400">Tổng cộng:</div>
                  <div className="font-bold text-[#4a2c5d]">
                    {formatCurrency(order.price * order.quantity)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-110 mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 font-medium">Tổng thanh toán</span>
            <span className="text-xl font-bold text-[#4a2c5d]">
              {formatCurrency(totalAmount)}
            </span>
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
