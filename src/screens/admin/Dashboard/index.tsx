import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { fetchDashboardStats } from "../../../redux/reducer/adminDashboard";
import AdminLayout from "../../../layout/AdminLayout";
import { ShoppingBag, TableProperties, Users, DollarSign } from "lucide-react";

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string | number;
  color: string;
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
    <div
      className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center shrink-0`}
    >
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, loading } = useSelector(
    (state: RootState) => state.adminDashboard,
  );

  const isFetched = useRef(false);
  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchDashboardStats());
      isFetched.current = true;
    }
  }, [dispatch]);

  const formatRevenue = (n: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(n);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Tổng quan</h2>
          <p className="text-gray-500 text-sm mt-1">
            Thống kê toàn bộ hệ thống
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse h-28"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard
              icon={ShoppingBag}
              label="Tổng đơn hàng"
              value={stats?.totalOrders ?? 0}
              color="bg-orange-500"
            />
            <StatCard
              icon={DollarSign}
              label="Doanh thu"
              value={formatRevenue(stats?.totalRevenue ?? 0)}
              color="bg-emerald-500"
            />
            <StatCard
              icon={Users}
              label="Phiên hoạt động"
              value={stats?.activeSessions ?? 0}
              color="bg-sky-500"
            />
            <StatCard
              icon={TableProperties}
              label="Tổng số bàn"
              value={stats?.totalTables ?? 0}
              color="bg-violet-500"
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
