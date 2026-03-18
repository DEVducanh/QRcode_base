import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

// Client screens
import HomeScreen from "./screens/client/Home";
import ProductScreen from "./components/Product";
import OrderScreen from "./screens/client/OrderScreen";
import CartScreen from "./screens/client/CartScreen";
import QRScan from "./components/QRScanPage";

// Admin screens
import AdminLogin from "./screens/admin/Login";
import Dashboard from "./screens/admin/Dashboard";
import ProductsManager from "./screens/admin/Products";
import CategoriesManager from "./screens/admin/Categories";
import TablesManager from "./screens/admin/Tables";
import OrdersManager from "./screens/admin/Orders";

const RequireAdminAuth = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.adminAuth.token);
  if (!token) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      {/* Client routes */}
      <Route path="/" element={<HomeScreen />} />
      <Route path="/table/:tableCode" element={<QRScan />} />
      <Route path="/products" element={<ProductScreen />} />
      <Route path="/orders" element={<OrderScreen />} />
      <Route path="/cart" element={<CartScreen />} />

      {/* Admin auth */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin protected routes */}
      <Route
        path="/admin"
        element={
          <RequireAdminAuth>
            <Dashboard />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/products"
        element={
          <RequireAdminAuth>
            <ProductsManager />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <RequireAdminAuth>
            <CategoriesManager />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/tables"
        element={
          <RequireAdminAuth>
            <TablesManager />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <RequireAdminAuth>
            <OrdersManager />
          </RequireAdminAuth>
        }
      />
    </Routes>
  );
}

export default App;
