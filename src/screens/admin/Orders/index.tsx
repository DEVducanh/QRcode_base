import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import {
  fetchAdminOrders,
  updateAdminOrderStatus,
} from "../../../redux/reducer/adminOrder";
import AdminLayout from "../../../layout/AdminLayout";
import { Loader2, RefreshCw } from "lucide-react";
import { useMessageApi } from "../../../lib/messageContext";

const ORDER_STATUSES = ["NEW", "PROCESSING", "DONE", "PAID", "CANCEL"];

const statusStyle: Record<string, string> = {
  NEW: "bg-sky-100 text-sky-700",
  PROCESSING: "bg-amber-100 text-amber-700",
  DONE: "bg-emerald-100 text-emerald-700",
  PAID: "bg-violet-100 text-violet-700",
  CANCEL: "bg-red-100 text-red-600",
};

const OrdersManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading } = useSelector(
    (state: RootState) => state.adminOrder,
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const messageApi = useMessageApi();

  const isFetched = useRef(false);
  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchAdminOrders());
      isFetched.current = true;
    }
  }, [dispatch]);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    const resultAction = await dispatch(updateAdminOrderStatus({ id, status }));
    if (updateAdminOrderStatus.fulfilled.match(resultAction)) {
      messageApi.success("Cập nhật trạng thái thành công");
    } else {
      messageApi.error(resultAction.payload || "Cập nhật thất bại");
    }
    setUpdatingId(null);
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(n);

  const formatDate = (d?: Date | string) =>
    d ? new Date(d).toLocaleString("vi-VN") : "—";

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Đơn hàng</h2>
            <p className="text-gray-500 text-sm mt-1">
              {orders.length} đơn hàng
            </p>
          </div>
          <button
            onClick={() => dispatch(fetchAdminOrders())}
            className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <RefreshCw size={15} /> Làm mới
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={32} className="animate-spin text-orange-500" />
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 font-semibold">
                <tr>
                  <th className="text-left px-6 py-3">Mã đơn</th>
                  <th className="text-left px-6 py-3">Tổng tiền</th>
                  <th className="text-left px-6 py-3">Thời gian</th>
                  <th className="text-left px-6 py-3">Trạng thái</th>
                  <th className="text-left px-6 py-3">Cập nhật</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-400">
                      Chưa có đơn hàng
                    </td>
                  </tr>
                )}
                {orders.map((o) => (
                  <tr key={o._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                        {o._id?.slice(-8)}
                      </code>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {formatPrice(o.total_price)}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(o.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          statusStyle[o.status] || "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            handleStatusChange(o._id!, e.target.value)
                          }
                          className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-400"
                          disabled={
                            updatingId === o._id ||
                            o.status === "CANCEL" ||
                            o.status === "PAID"
                          }
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        {updatingId === o._id && (
                          <Loader2
                            size={14}
                            className="animate-spin text-orange-500"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersManager;
